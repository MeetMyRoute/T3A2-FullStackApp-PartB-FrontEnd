import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProfileDataProvider } from './contexts/ProfileContext'
import { UserProvider } from './contexts/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
        <ProfileDataProvider>
          <App />
        </ProfileDataProvider>
      </UserProvider>
  </StrictMode>
)
