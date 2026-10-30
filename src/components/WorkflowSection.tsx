import { workflowContent } from '../content/homeSections'
import { motion } from 'motion/react'
import { Reveal, useRevealVariants } from './Reveal'

export function WorkflowSection() {
  const revealVariants = useRevealVariants()
  const firstRow = workflowContent.stages.slice(0, 4)
  const secondRow = workflowContent.stages.slice(4)
  return <Reveal as="section" className="workflow-section" labelledBy="workflow-title" variant="group">
    <div className="page-container">
      <motion.div className="workflow-heading" variants={revealVariants.item}>
        <h2 id="workflow-title">{workflowContent.title}</h2>
        <p className="workflow-intro">{workflowContent.introduction}</p>
      </motion.div>
      <motion.div className="workflow-grid workflow-grid--first" variants={revealVariants.group}>
        {firstRow.map((stage) => <motion.article className="workflow-stage" variants={revealVariants.item} key={stage.number}>
          <span className="workflow-stage__number" aria-hidden="true">{stage.number}</span>
          <h3>{stage.title}</h3><p>{stage.text}</p>
        </motion.article>)}
      </motion.div>
      <motion.div className="workflow-grid workflow-grid--second" variants={revealVariants.groupLate}>
        {secondRow.map((stage) => <motion.article className="workflow-stage" variants={revealVariants.item} key={stage.number}>
          <span className="workflow-stage__number" aria-hidden="true">{stage.number}</span>
          <h3>{stage.title}</h3><p>{stage.text}</p>
        </motion.article>)}
      </motion.div>
    </div>
  </Reveal>
}
