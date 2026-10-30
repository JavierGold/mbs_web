import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'motion/react'

type HeroImageProps = {
  src: string
  alt: string
  width: number
  height: number
}

// Keep the existing img DOM/layout. Never leave the artwork hidden while loading.
export function HeroImage({ src, alt, width, height }: HeroImageProps) {
  const optimized = src.replace(/\.png$/, '.webp')
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const image = useRef<HTMLImageElement>(null)
  const revealed = useRef('')
  const controls = useAnimationControls()
  const reducedMotion = useReducedMotion()
  const source = failedSource === optimized ? src : optimized

  useEffect(() => {
    const element = image.current
    if (!element) return
    controls.set({ opacity: 1 })
    let cancelled = false
    const reveal = async () => {
      if (!element.naturalWidth) return
      const loadedSource = element.currentSrc
      if (revealed.current === loadedSource) return
      try { await element.decode() } catch { /* Loaded images may not support decode. */ }
      if (cancelled || element.currentSrc !== loadedSource) return
      revealed.current = loadedSource
      if (reducedMotion) { controls.set({ opacity: 1 }); return }
      try {
        controls.set({ opacity: 0 })
        await controls.start({ opacity: 1, transition: { duration: .9, ease: 'easeOut' } })
      } catch {
        // Animation failure must never hide otherwise loaded artwork.
      } finally {
        if (!cancelled) controls.set({ opacity: 1 })
      }
    }
    const onLoad = () => { void reveal() }
    element.addEventListener('load', onLoad)
    if (element.complete) onLoad()
    return () => {
      cancelled = true
      element.removeEventListener('load', onLoad)
      controls.stop()
    }
  }, [source, reducedMotion, controls])

  return <motion.img ref={image} src={source} alt={alt} width={width} height={height}
    loading="eager" fetchPriority="high" decoding="async"
    initial={false} inherit={false} animate={controls}
    onError={() => {
      controls.set({ opacity: 1 })
      // A missing/stale WebP must not break a manual deployment or an older browser.
      if (source !== src) setFailedSource(optimized)
    }} />
}
