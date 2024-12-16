import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProfileDataProvider } from './contexts/ProfileContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileDataProvider>
      <App />
    </ProfileDataProvider>
  </StrictMode>
)
