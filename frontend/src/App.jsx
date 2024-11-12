import About from './components/About'
import Footer from './components/Footer'
import HomePage from './components/Home'
import Login from './components/Login'
import Navbar from './components/navbar'
import ShortUrl from './components/ShortUrl'
import Signup from './components/Signup'
import ProtectedRoute from './context/Protectedroute.jsx'
import RedirectUrl from './components/RedirectUrl.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (

    <BrowserRouter>
     
      <Routes>
        <Route path='/' element={<><Navbar /><HomePage /> <Footer /></>} />
        <Route path='/about' element={<><Navbar /><About /> <Footer /></>} />
        <Route path='/shorturl' element={<ProtectedRoute><><Navbar /><ShortUrl /> <Footer /></></ProtectedRoute>} />
        <Route path='/login' element={<><Navbar /><Login /> <Footer /></>} />
        <Route path='/signup' element={<><Navbar /><Signup /> <Footer /></>} />
        <Route path="/:shortUrl" element={<RedirectUrl />} />
      </Routes>
    </BrowserRouter>
 

  )
}

export default App
