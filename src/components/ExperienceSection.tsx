import { experienceContent } from '../content/homeSections'
import { Reveal } from './Reveal'

export function ExperienceSection() {
  return <Reveal as="section" className="experience-section page-container" labelledBy="experience-title">
    <h2 id="experience-title" className="experience-section__title">
      <span className="experience-section__number">{experienceContent.years}</span>
      <span>{experienceContent.label}</span>
    </h2>
    <p>{experienceContent.text}</p>
  </Reveal>
}
