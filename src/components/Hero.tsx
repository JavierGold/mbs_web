import { homeContent } from '../content/home'
import { motion, useReducedMotion } from 'motion/react'
import { useRevealVariants } from './Reveal'

export function Hero() {
  const reducedMotion = useReducedMotion()
  const revealVariants = useRevealVariants()
  return <main className="hero">
    <motion.div className="hero__copy" variants={revealVariants.heroGroup} initial={reducedMotion ? false : 'hidden'} animate="visible">
      <motion.h1 variants={revealVariants.heroText}>{homeContent.title[0]} <span>{homeContent.title[1]}</span></motion.h1>
      <motion.p variants={revealVariants.heroText}>{homeContent.description}</motion.p>
      <motion.div className="hero__actions" variants={revealVariants.heroText}>
        <a className="button button--primary" href="/servicios">{homeContent.servicesCta}<span aria-hidden="true">→</span></a>
        <a className="button button--outline" href="/contacto">{homeContent.contactCta}</a>
      </motion.div>
    </motion.div>
    <motion.div className="hero__visual" variants={revealVariants.heroGraphic} initial={reducedMotion ? false : 'hidden'} animate="visible" transition={{ duration: reducedMotion ? 0 : .9, delay: reducedMotion ? 0 : .15, ease: 'easeOut' }}><img src="/img/mainframe.png" alt="" /></motion.div>
  </main>
}
