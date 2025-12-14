import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddDonationPage from './pages/AddDonationPage'
import ManageDonorsPage from './pages/ManageDonorsPage'

function App() {
  // Load donations from localStorage on initial render
  const [donations, setDonations] = useState(() => {
    const savedDonations = localStorage.getItem('donations')
    return savedDonations ? JSON.parse(savedDonations) : []
  })

  // Save donations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('donations', JSON.stringify(donations))
  }, [donations])

  const addDonation = (donation) => {
    const newDonations = [...donations, { ...donation, id: Date.now() }]
    setDonations(newDonations)
  }

  const updateDonation = (id, updatedDonation) => {
    const newDonations = donations.map(d => d.id === id ? { ...updatedDonation, id } : d)
    setDonations(newDonations)
  }

  const deleteDonation = (id) => {
    const newDonations = donations.filter(d => d.id !== id)
    setDonations(newDonations)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" className="h-12 w-12 md:h-14 md:w-14 object-contain bg-white rounded-full p-1" />
                <h1 className="text-lg md:text-xl font-bold text-center md:text-left">ঘোষগ্রাম আল-ইহসান ওয়েলফেয়ার সোসাইটি</h1>
              </div>
              <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
                <Link
                  to="/"
                  className="px-3 md:px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200 font-medium text-sm md:text-base"
                >
                  হোম
                </Link>
                <Link
                  to="/add-donation"
                  className="px-3 md:px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all duration-200 font-medium text-sm md:text-base"
                >
                  দান যোগ করুন
                </Link>
                <Link
                  to="/manage-donors"
                  className="px-3 md:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-200 font-medium text-sm md:text-base"
                >
                  দাতা পরিচালনা
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage donations={donations} />} />
          <Route path="/add-donation" element={<AddDonationPage addDonation={addDonation} />} />
          <Route path="/manage-donors" element={<ManageDonorsPage donations={donations} updateDonation={updateDonation} deleteDonation={deleteDonation} />} />
        </Routes>

        <footer className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-sm md:text-base font-medium tracking-wide">
              Developed by{" "}
              <a
                href="https://www.linkedin.com/in/mahdee-al-amin/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-300 hover:text-white transition"
              >
                Mahdee Al Amin
              </a>
            </p>
          </div>
        </footer>

      </div>
    </Router>
  )
}

export default App