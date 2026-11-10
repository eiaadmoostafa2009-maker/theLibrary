import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Favourites from "./pages/Favourite"
import Sidebar from "./layout/Sidebar"
import './App.css'

function AppLayout() {
  const location = useLocation();

  // Pages that get the sidebar layout
  const sidebarPages = ["/home", "/fav"];
  const hasSidebar = sidebarPages.includes(location.pathname);

  // Auth pages and landing page get their own layout
  if (!hasSidebar) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/fav" element={<Favourites />} />
        </Routes>
      </main>
    </div>
  );
}


function App() {

  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  )
}

export default App
