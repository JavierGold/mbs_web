import { technologyCategories } from '../content/homeSections'
import { Reveal, useRevealVariants } from './Reveal'
import { motion } from 'motion/react'

export function TechnologyCatalog() {
  const revealVariants = useRevealVariants()
  return <Reveal as="section" className="technology-catalog" label="Tecnologías" variant="group">
    <div className="page-container">
      <div className="technology-grid technology-grid--top">
        {technologyCategories.slice(0, 3).map((item) => <motion.article variants={revealVariants.itemFade} className="technology-item" key={item.title}>
          <img src={item.image} alt="" width={item.width} height={item.height} loading="lazy" />
          <h2>{item.title}</h2>
          {item.description && <p>{item.description}</p>}
          <div className="technology-item__lines">{item.lines.map((line) => <p key={line}>{line}</p>)}</div>
        </motion.article>)}
      </div>
      <div className="technology-grid technology-grid--bottom">
        {technologyCategories.slice(3).map((item) => <motion.article variants={revealVariants.itemFade} className={`technology-item${item.title === 'Procesamiento de datos' ? ' technology-item--processing' : ''}`} key={item.title}>
          <img src={item.image} alt="" width={item.width} height={item.height} loading="lazy" />
          <h2>{item.title}</h2>
          {item.description && <p>{item.description}</p>}
          <div className="technology-item__lines">{item.lines.map((line) => <p key={line}>{line}</p>)}</div>
        </motion.article>)}
      </div>
    </div>
  </Reveal>
}
