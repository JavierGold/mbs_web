import { HeroImage } from '../components/HeroImage'
import { servicesPageContent } from '../content/servicesPage'
import { Reveal, useRevealVariants } from '../components/Reveal'
import { motion, useReducedMotion } from 'motion/react'

export function ServicesPage() {
  const reducedMotion = useReducedMotion()
  const revealVariants = useRevealVariants()
  const { hero, sections } = servicesPageContent

  return <main className="services-page">
    <section className="services-page__hero" aria-labelledby="services-page-title">
      <div className="services-page__hero-inner page-container">
        <motion.div className="services-page__hero-copy" variants={revealVariants.heroGroup} initial={reducedMotion ? false : 'hidden'} animate="visible">
          <motion.h1 id="services-page-title" variants={revealVariants.heroText}>{hero.titleBefore} <span>{hero.titleAccent}</span>.</motion.h1>
          <motion.p variants={revealVariants.heroText}>{hero.text}</motion.p>
          <motion.a className="button button--outline services-page__hero-action" variants={revealVariants.heroText} href="/contacto">{hero.button}</motion.a>
        </motion.div>
        <figure className="services-page__graphic">
          <HeroImage src={hero.image} width={hero.imageWidth} height={hero.imageHeight} alt="" />
        </figure>
      </div>
    </section>

    {sections.map((section) => <Reveal as="section" variant="group" className="services-page__service" id={section.id} key={section.id} labelledBy={`service-title-${section.id}`}>
      <div className="service-detail__inner page-container">
        <motion.div className="service-detail__media" variants={revealVariants.itemFade}>
          <span className="service-detail__number" aria-hidden="true">{section.number}</span>
          <img loading="lazy" decoding="async" src={section.image} width={section.imageWidth} height={section.imageHeight} alt="" />
        </motion.div>
        <motion.div className="service-detail__content" variants={revealVariants.heroText}>
          <div className="service-detail__copy">
            <h2 id={`service-title-${section.id}`}>{section.title}</h2>
            <p>{section.text}</p>
          </div>
          <div className="service-detail__capabilities">
            <h3 id={`service-list-title-${section.id}`}>{section.listTitle}</h3>
            <ul aria-labelledby={`service-list-title-${section.id}`}>
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </motion.div>
      </div>
    </Reveal>)}
  </main>
}
