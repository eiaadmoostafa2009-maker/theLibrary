import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Favourites from "./pages/Favourite"


function App() {
  
  return (
    <div className="app">


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/fav" element={<Favourites />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  

    </div>
  )
}

export default App
