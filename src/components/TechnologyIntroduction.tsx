import { technologyIntroductionContent as content } from '../content/homeSections'
import { Reveal } from './Reveal'

export function TechnologyIntroduction() {
  return <Reveal as="section" className="technology-intro page-container" labelledBy="technology-intro-title">
    <h2 id="technology-intro-title">{content.titleBefore} <span>{content.titleLegacy}</span> {content.titleMiddle} <span>{content.titleModern}</span></h2>
    <p>{content.text}</p>
  </Reveal>
}
