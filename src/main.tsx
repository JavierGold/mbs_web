import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles/global.css'
import './styles/home-sections.css'
import './styles/services-page.css'
import './styles/about-page.css'
import './styles/university-page.css'
import './styles/contact-page.css'
import './styles/form-submission-status.css'
import './styles/closing-sections.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
