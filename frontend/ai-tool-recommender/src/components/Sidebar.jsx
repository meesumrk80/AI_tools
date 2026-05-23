import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand" onClick={() => navigate('/')}>AI Recommender</div>
        <ThemeToggle />
      </div>

      <nav className="nav-links">
        <NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}>Search</NavLink>
        <NavLink to="/categories" className={({isActive})=> isActive? 'active' : ''}>Categories</NavLink>
        <NavLink to="/trendings" className={({isActive})=> isActive? 'active' : ''}>Trending</NavLink>
        <NavLink to="/top-tools" className={({isActive})=> isActive? 'active' : ''}>Top Tools</NavLink>
        <NavLink to="/tools" className={({isActive})=> isActive? 'active' : ''}>All Tools</NavLink>
      </nav>

      <div className="sidebar-footer">
        <a href="/" onClick={(e)=>e.preventDefault()}>Docs</a>
      </div>
    </aside>
  )
}
