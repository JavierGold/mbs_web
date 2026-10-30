import { HeroImage } from '../components/HeroImage'
import { useEffect, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import { FormSubmissionStatus, FormSubmitButton } from '../components/FormSubmissionStatus'
import { universityPageContent as content } from '../content/universityPage'
import { runFormSubmission, type FormSubmissionState } from '../forms/formSubmission'
import { Reveal, useRevealVariants } from '../components/Reveal'
import { motion, useReducedMotion } from 'motion/react'

const maxFileSize = 5 * 1024 * 1024

export function UniversityPage() {
  useEffect(() => {
    if (window.location.hash !== '#formulario-university') return
    const frame = requestAnimationFrame(() => {
      document.getElementById('formulario-university')?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const reducedMotion = useReducedMotion()
  const revealVariants = useRevealVariants()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>('idle')
  const [isDragging, setIsDragging] = useState(false)

  const validateAndStoreFile = async (file?: File) => {
    if (!file) return
    setSubmissionState('idle')
    setFileError('')
    if (file.size > maxFileSize) {
      setSelectedFile(null)
      setFileError(content.form.errors.tooLarge)
      return
    }
    const signature = new TextDecoder().decode(await file.slice(0, 5).arrayBuffer())
    if (!file.name.toLowerCase().endsWith('.pdf') || signature !== '%PDF-') {
      setSelectedFile(null)
      setFileError(content.form.errors.invalidPdf)
      return
    }
    setSelectedFile(file)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    void validateAndStoreFile(input.files?.[0])
    input.value = ''
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    void validateAndStoreFile(event.dataTransfer.files[0])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submissionState === 'sending' || submissionState === 'success') return
    void runFormSubmission(null, setSubmissionState)
  }

  return <main className="university-page">
    <section className="university-page__hero" aria-labelledby="university-hero-title">
      <div className="university-page__hero-inner page-container">
        <motion.div className="university-page__hero-copy" variants={revealVariants.heroGroup} initial={reducedMotion ? false : 'hidden'} animate="visible">
          <motion.h1 id="university-hero-title" variants={revealVariants.heroText}>{content.hero.titleStart}<span>{content.hero.titleAccent}</span>{content.hero.titleEnd}</motion.h1>
          <motion.p variants={revealVariants.heroText}>{content.hero.descriptionStart}<span>{content.hero.descriptionAccent}</span>{content.hero.descriptionEnd}</motion.p>
          <motion.a className="button button--outline university-page__hero-button" variants={revealVariants.heroText} href={content.hero.buttonHref}>{content.hero.button}<span className="university-page__hero-button-arrow" aria-hidden="true">→</span></motion.a>
        </motion.div>
        <figure className="university-page__hero-art">
          <HeroImage src={content.hero.image} width={content.hero.imageWidth} height={content.hero.imageHeight} alt="Laptop con código y libro técnico abierto." />
        </figure>
      </div>
    </section>

    <Reveal as="section" className="university-page__growth" labelledBy="university-growth-title" variant="group">
      <div className="university-page__growth-inner page-container">
        <h2 id="university-growth-title">{content.growth.title}</h2>
        <div className="university-page__growth-grid">
          {content.growth.blocks.map((block) => <motion.article className="university-page__growth-item" variants={revealVariants.item} key={block.number}>
            <div className="university-page__growth-copy">
              <span className="university-page__number">{block.number}</span>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </div>
          </motion.article>)}
        </div>
      </div>
    </Reveal>

    <Reveal as="section" className="university-page__areas" labelledBy="university-areas-title" variant="group">
      <div className="university-page__areas-inner page-container">
        <motion.div className="university-page__areas-copy" variants={revealVariants.item}>
          <h2 id="university-areas-title">{content.areas.titleStart}<span>{content.areas.titleAccent}</span>{content.areas.titleEnd}</h2>
          <p>{content.areas.description}</p>
        </motion.div>
        <ol className="university-page__areas-list">
          {content.areas.items.map((area, index) => <motion.li variants={revealVariants.item} key={area}><span>{String(index + 1).padStart(2, '0')}</span><p>{area}</p></motion.li>)}
        </ol>
      </div>
    </Reveal>

    <Reveal as="section" className="university-page__form-section" id="formulario-university" labelledBy="university-form-title" variant="fade">
      <div className="university-page__form-inner page-container">
        <div className="university-page__form-heading">
          <h2 id="university-form-title">{content.form.title}</h2>
          <p>{content.form.description}</p>
        </div>
        <form className="university-form" onSubmit={handleSubmit} aria-busy={submissionState === 'sending'}>
          <div className="university-form__field"><label htmlFor="university-full-name">{content.form.fullName}</label><input id="university-full-name" name="fullName" type="text" autoComplete="name" /></div>
          <div className="university-form__field"><label htmlFor="university-email">{content.form.email}</label><input id="university-email" name="email" type="email" autoComplete="email" /></div>
          <div className="university-form__field"><label htmlFor="university-phone">{content.form.phone}</label><input id="university-phone" name="phone" type="tel" autoComplete="tel" /></div>
          <div className="university-form__field"><label htmlFor="university-area">{content.form.area}</label><select id="university-area" name="area" defaultValue=""><option value="" disabled>{content.form.selectPlaceholder}</option>{content.form.areas.map((area) => <option key={area} value={area}>{area}</option>)}</select></div>
          <div className="university-form__field university-form__field--full"><label htmlFor="university-technologies">{content.form.technologies}</label><input id="university-technologies" name="technologies" type="text" /></div>
          <div className="university-form__field university-form__field--full"><label htmlFor="university-availability">{content.form.availability}</label><select id="university-availability" name="availability" defaultValue=""><option value="" disabled>{content.form.selectPlaceholder}</option>{content.form.availabilityOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
          <div className="university-form__field university-form__field--full"><label htmlFor="university-message">{content.form.message}</label><textarea id="university-message" name="message" rows={4} /></div>
          <div className="university-form__field university-form__field--full">
            <span className="university-form__label" id="university-cv-label">{content.form.cvLabel}</span>
            <div className={`university-form__upload${isDragging ? ' university-form__upload--dragging' : ''}`} onDragOver={handleDragOver} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} role="group" aria-labelledby="university-cv-label">
              <input className="university-form__file-input" id="university-cv" name="cv" type="file" accept="application/pdf,.pdf" onChange={handleFileChange} aria-describedby="university-file-hint" aria-invalid={Boolean(fileError)} />
              <label className="university-form__upload-button" htmlFor="university-cv">{content.form.attach}</label>
              <p>{content.form.dropHint}</p>
              <p className="university-form__file-hint" id="university-file-hint">{content.form.fileHint}</p>
              {selectedFile && <p className="university-form__file-name" role="status">{selectedFile.name}</p>}
              {fileError && <p className="university-form__file-error" role="alert">{fileError}</p>}
            </div>
          </div>
          <FormSubmitButton state={submissionState} label={content.form.submit} sendingLabel={content.form.status.sending} className="button button--primary university-form__submit" />
          <FormSubmissionStatus state={submissionState} messages={content.form.status} />
        </form>
      </div>
    </Reveal>
  </main>
}
