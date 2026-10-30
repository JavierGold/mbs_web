import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type HeroImageProps = {
  src: string
  alt: string
  width: number
  height: number
}

export function HeroImage({ src, alt, width, height }: HeroImageProps) {
  const optimized = src.replace(/\.png$/, '.webp')
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const [readySource, setReadySource] = useState<string | null>(null)
  const image = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()
  const source = failedSource === optimized ? src : optimized

  useEffect(() => {
    const element = image.current
    if (!element) return
    let cancelled = false
    let revealing = false
    let firstFrame = 0
    let secondFrame = 0
    const reveal = async () => {
      if (!element.naturalWidth || revealing) return
      revealing = true
      const loadedSource = element.currentSrc
      try { await element.decode() } catch { /* A decoded image can still be shown if decode() is unsupported. */ }
      if (cancelled || element.currentSrc !== loadedSource) return
      // Paint the initial transparent state before starting the fade, even from cache.
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          if (!cancelled) setReadySource(source)
        })
      })
    }
    const onLoad = () => { void reveal() }
    element.addEventListener('load', onLoad)
    if (element.complete) onLoad()
    return () => {
      cancelled = true
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
      element.removeEventListener('load', onLoad)
    }
  }, [source])

  const visible = reducedMotion || readySource === source
  return <motion.img key={source} ref={image} src={source} alt={alt} width={width} height={height}
    loading="eager" fetchPriority="high" decoding="async"
    initial={reducedMotion ? false : { opacity: 0 }} inherit={false}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: reducedMotion ? 0 : .9, ease: 'easeOut' }}
    onError={() => {
      // A failed WebP must not flash at full opacity while its PNG fallback loads.
      if (source !== src) setFailedSource(optimized)
      else setReadySource(source) // Keep the alternative text visible if both fail.
    }} />
}
