import { useEffect, useState, type FormEvent } from 'react'
import { FormSubmissionStatus, FormSubmitButton } from '../components/FormSubmissionStatus'
import { contactPageContent } from '../content/contactPage'
import { servicesPageContent } from '../content/servicesPage'
import { runFormSubmission, type FormSubmissionState } from '../forms/formSubmission'
import { Reveal, useRevealVariants } from '../components/Reveal'
import { motion, useReducedMotion } from 'motion/react'

export function ContactPage() {
  const reducedMotion = useReducedMotion()
  const revealVariants = useRevealVariants()
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>('idle')

  useEffect(() => {
    if (window.location.hash === '#formulario') {
      document.getElementById('formulario')?.scrollIntoView({ block: 'start' })
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submissionState === 'sending' || submissionState === 'success') return
    void runFormSubmission(null, setSubmissionState)
  }

  return <main className="contact-page">
    <section className="contact-page__hero" aria-labelledby="contact-page-title">
      <div className="contact-page__hero-inner page-container">
        <motion.div className="contact-page__copy" variants={revealVariants.heroGroup} initial={reducedMotion ? false : 'hidden'} animate="visible">
          <motion.h1 id="contact-page-title" variants={revealVariants.heroText}>{contactPageContent.title}</motion.h1>
          <motion.p variants={revealVariants.heroText}>{contactPageContent.description}</motion.p>
        </motion.div>
        <motion.div className="contact-page__art" variants={revealVariants.heroGraphic} initial={reducedMotion ? false : 'hidden'} animate="visible" transition={{ duration: .9, delay: .15, ease: 'easeOut' }}>
          <img src={contactPageContent.image} alt={contactPageContent.imageAlt} />
        </motion.div>
      </div>
    </section>
    <Reveal as="section" className="contact-page__form-section" id="formulario" labelledBy="contact-form-title" variant="fade">
      <div className="contact-page__form-inner page-container">
        <div className="contact-page__form-heading">
          <h2 id="contact-form-title"><span>Formulario</span><span>de Contacto</span></h2>
        </div>
        <form className="contact-page__form-card" aria-labelledby="contact-form-title" onSubmit={handleSubmit} aria-busy={submissionState === 'sending'}>
          <div className="contact-page__field">
            <label htmlFor="contact-full-name">{contactPageContent.form.fullName}</label>
            <input id="contact-full-name" name="fullName" type="text" autoComplete="name" required />
          </div>
          <div className="contact-page__field">
            <label htmlFor="contact-company">{contactPageContent.form.company}</label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" />
          </div>
          <div className="contact-page__field">
            <label htmlFor="contact-email">{contactPageContent.form.email}</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="contact-page__field">
            <label htmlFor="contact-phone">{contactPageContent.form.phone}</label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="contact-page__field contact-page__field--full">
            <label htmlFor="contact-service">{contactPageContent.form.service}</label>
            <select id="contact-service" name="service" defaultValue="">
              <option value="" disabled>{contactPageContent.form.servicePlaceholder}</option>
              {servicesPageContent.sections.map((service) => <option value={service.title} key={service.id}>{service.title}</option>)}
            </select>
          </div>
          <div className="contact-page__field contact-page__field--full">
            <label htmlFor="contact-project">{contactPageContent.form.project}</label>
            <textarea id="contact-project" name="project" rows={5} required />
          </div>
          <FormSubmitButton state={submissionState} label={contactPageContent.form.submit} sendingLabel={contactPageContent.form.status.sending} className="button button--primary contact-page__submit" />
          <FormSubmissionStatus state={submissionState} messages={contactPageContent.form.status} />
        </form>
      </div>
    </Reveal>
  </main>
}
