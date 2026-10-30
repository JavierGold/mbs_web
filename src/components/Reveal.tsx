import type { ComponentType, ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

const MotionTag: Record<string, ComponentType<any>> = {
  article: motion.article,
  div: motion.div,
  footer: motion.footer,
  figure: motion.figure,
  section: motion.section,
  ul: motion.ul,
}

const variants: Record<string, Variants> = {
  heroGroup: { hidden: {}, visible: { transition: { staggerChildren: .12 } } },
  heroText: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .9, ease: 'easeOut' } } },
  heroGraphic: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .9, ease: 'easeOut' } } },
  reveal: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .8, ease: 'easeOut' } } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .8, ease: 'easeOut' } } },
  group: { hidden: {}, visible: { transition: { staggerChildren: .08 } } },
  groupLate: { hidden: {}, visible: { transition: { staggerChildren: .08, delayChildren: .24 } } },
  item: { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease: 'easeOut' } } },
  itemFade: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .8, ease: 'easeOut' } } },
}

const immediateVariants: Record<string, Variants> = {
  heroGroup: { hidden: {}, visible: { transition: { staggerChildren: 0, delayChildren: 0 } } },
  heroText: { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0, transition: { duration: 0 } } },
  heroGraphic: { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { duration: 0 } } },
  reveal: { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0, transition: { duration: 0 } } },
  fade: { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { duration: 0 } } },
  group: { hidden: {}, visible: { transition: { staggerChildren: 0, delayChildren: 0 } } },
  groupLate: { hidden: {}, visible: { transition: { staggerChildren: 0, delayChildren: 0 } } },
  item: { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0, transition: { duration: 0 } } },
  itemFade: { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { duration: 0 } } },
}

export function useRevealVariants() {
  const reducedMotion = useReducedMotion()
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return reducedMotion || prefersReduced ? immediateVariants : variants
}

type RevealProps = {
  as?: keyof typeof MotionTag
  children: ReactNode
  className?: string
  id?: string
  labelledBy?: string
  label?: string
  variant?: keyof typeof variants
  trigger?: 'scroll' | 'load'
}

export function Reveal({ as = 'div', children, className, id, labelledBy, label, variant = 'reveal', trigger = 'scroll' }: RevealProps) {
  const resolvedVariants = useRevealVariants()
  const reducedMotion = useReducedMotion()
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const instant = reducedMotion || prefersReduced || typeof window === 'undefined' || !('IntersectionObserver' in window)
  const Tag = MotionTag[as]
  const selected = instant ? immediateVariants[variant] : resolvedVariants[variant]
  return <Tag
    className={className}
    id={id}
    aria-labelledby={labelledBy}
    aria-label={label}
    variants={selected}
    initial={instant ? false : 'hidden'}
    animate={trigger === 'load' || instant ? 'visible' : undefined}
    whileInView={trigger === 'scroll' && !instant ? 'visible' : undefined}
    viewport={trigger === 'scroll' ? { once: true, amount: .15 } : undefined}
  >{children}</Tag>
}

export const revealVariants = variants
