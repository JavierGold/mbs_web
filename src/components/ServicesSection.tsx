import { servicesContent } from '../content/homeSections'
import { Reveal, useRevealVariants } from './Reveal'
import { motion } from 'motion/react'

export function ServicesSection() {
  const revealVariants = useRevealVariants()
  return <Reveal as="section" className="services-section" labelledBy="services-title" variant="group">
    <div className="page-container">
      <h2 id="services-title">{servicesContent.titleBefore}<br /><span>{servicesContent.titleAccent}</span></h2>
      <div className="services-grid">
        {servicesContent.items.map((item) => <motion.article variants={revealVariants.itemFade} className="service-item" key={item.title}>
          <img src={item.image} alt="" width={item.width} height={item.height} loading="lazy" />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </motion.article>)}
      </div>
      <a className="services-link" href="/servicios">{servicesContent.link}<span aria-hidden="true">→</span></a>
    </div>
  </Reveal>
}
