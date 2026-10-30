import { aboutPageContent as content } from '../content/aboutPage'
import { Reveal, useRevealVariants } from '../components/Reveal'
import { motion, useReducedMotion } from 'motion/react'

export function AboutPage() {
  const reducedMotion = useReducedMotion()
  const revealVariants = useRevealVariants()
  return <main className="about-page">
    <section className="about-page__hero" aria-labelledby="about-hero-title">
      <div className="about-page__hero-inner page-container">
        <motion.div className="about-page__hero-copy" variants={revealVariants.heroGroup} initial={reducedMotion ? false : 'hidden'} animate="visible">
          <motion.h1 id="about-hero-title" variants={revealVariants.heroText}><span>{content.hero.titleStart}</span>{content.hero.titleMiddle}<span>{content.hero.titleAccent}</span>{content.hero.titleEnd}</motion.h1>
          <motion.p variants={revealVariants.heroText}>{content.hero.text}</motion.p>
        </motion.div>
        <motion.figure className="about-page__hero-art" variants={revealVariants.heroGraphic} initial={reducedMotion ? false : 'hidden'} animate="visible" transition={{ duration: .9, delay: .15, ease: 'easeOut' }}><img src={content.hero.image} width="1254" height="1254" alt="Equipo de profesionales colaborando en un proyecto de tecnología." /></motion.figure>
      </div>
    </section>

    <Reveal as="section" className="about-page__team" labelledBy="about-team-title">
      <div className="about-page__team-inner page-container">
        <h2 id="about-team-title">{content.team.title}</h2>
        <div><p>{content.team.text}</p><a href={content.team.href}>{content.team.link}</a></div>
      </div>
    </Reveal>

    <Reveal as="section" className="about-page__experience" labelledBy="about-experience-title" variant="group">
      <div className="page-container">
        <h2 id="about-experience-title">{content.experience.titleBefore}<span>{content.experience.titleAccent}</span>{content.experience.titleAfter}</h2>
        <div className="about-page__experience-grid">
          {content.experience.groups.map((group) => <motion.article className="about-page__experience-item" variants={revealVariants.itemFade} key={group.title}>
            <figure><img src={group.image} width={group.width} height={group.height} alt="" /></figure>
            <div><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </motion.article>)}
        </div>
      </div>
    </Reveal>

    <Reveal as="section" variant="group" className="about-page__projects" id="administracion-de-proyectos" labelledBy="about-projects-title">
      <div className="about-page__projects-inner page-container">
        <motion.div variants={revealVariants.item}><h2 id="about-projects-title">{content.projects.titleBefore}<span>{content.projects.titleAccent}</span>{content.projects.titleAfter}</h2><p>{content.projects.text}</p></motion.div>
        <motion.ul variants={revealVariants.group}>{content.projects.items.map((item) => <motion.li variants={revealVariants.item} key={item}><span aria-hidden="true" />{item}</motion.li>)}</motion.ul>
      </div>
    </Reveal>

    <Reveal as="section" className="about-page__success" labelledBy="about-success-title" variant="group">
      <div className="about-page__success-inner page-container">
        <motion.div className="about-page__success-copy" variants={revealVariants.item}><h2 id="about-success-title">{content.success.titleBefore}<span>{content.success.titleAccent}</span>{content.success.titleAfter}</h2><p>{content.success.text}</p></motion.div>
        <motion.figure variants={revealVariants.itemFade}><img src={content.success.image} width={content.success.width} height={content.success.height} alt={content.success.alt} /></motion.figure>
      </div>
    </Reveal>

    <Reveal as="section" className="about-page__office" labelledBy="about-office-title" variant="group">
      <div className="about-page__office-inner page-container">
        <motion.div className="about-page__office-copy" variants={revealVariants.item}><h2 id="about-office-title">{content.office.title}</h2><p>{content.office.text}</p></motion.div>
        <motion.div className="about-page__office-blocks" variants={revealVariants.group}>{content.office.blocks.map((block) => <motion.article variants={revealVariants.item} key={block.title}><h3>{block.title}</h3><p>{block.text}</p></motion.article>)}</motion.div>
      </div>
    </Reveal>
  </main>
}
