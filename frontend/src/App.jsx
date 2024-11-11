import About from './components/About'
import Footer from './components/Footer'
import HomePage from './components/Home'
import Login from './components/Login'
import Navbar from './components/navbar'
import ShortUrl from './components/ShortUrl'
import Signup from './components/Signup'
import ProtectedRoute from './context/Protectedroute.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (

    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/shorturl' element={<ProtectedRoute><ShortUrl /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
 

  )
}

export default App
