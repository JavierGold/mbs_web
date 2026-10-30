import { callToActionContent } from '../content/homeSections'
import { Reveal } from './Reveal'

export function CallToAction() {
  return <Reveal as="section" className="call-to-action" label="Contacto" variant="fade">
    <img className="call-to-action__art" src="/img/mainframe.png" alt="" aria-hidden="true" />
    <div className="call-to-action__content page-container">
      <h2>{callToActionContent.phrase}</h2>
      <a href="/contacto">{callToActionContent.button}<span aria-hidden="true">→</span></a>
    </div>
  </Reveal>
}
