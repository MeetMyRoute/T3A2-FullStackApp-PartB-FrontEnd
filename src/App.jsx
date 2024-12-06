import './App.css'
import { BrowserRouter as Route, Router, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'

function App() {

  return (
    <div>
      {/* <Router>
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
        </Routes>
      </Router> */}
      <Footer />
    </div>
  )
}

export default App
