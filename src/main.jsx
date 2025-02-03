import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./assets/all.scss"
import { BrowserRouter } from 'react-router-dom'

const basename = process.env.NODE_ENV === 'production' ? '/react-week2' : '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
