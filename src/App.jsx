import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { ForgetPassword } from './components/PasswordReset'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { ProfilePage } from './pages/ProfilePage'
import { ItineraryPage } from './pages/ItineraryPage'
import { SearchPage } from './pages/SearchPage'
import { MessagesPage } from './pages/MessagesPage'

function App() {

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/logout" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
