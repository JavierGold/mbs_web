import { HeroImage } from './HeroImage'
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
        <a className="button button--outline hero__contact" href="/contacto">{homeContent.contactCta}<span className="hero__contact-arrow" aria-hidden="true">→</span></a>
      </motion.div>
    </motion.div>
    <div className="hero__visual"><HeroImage src="/img/mainframe.png" width={855} height={715} alt="" /></div>
  </main>
}
