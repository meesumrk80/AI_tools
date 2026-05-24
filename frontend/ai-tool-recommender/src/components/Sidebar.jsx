import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle theme"
      type="button"
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <button className="brand" type="button" onClick={() => navigate('/')}>
          <span>AI Recommender</span>
          {/* <small>FastAPI + React</small> */}
          <small> Powered by Ai</small>
        </button>
        <ThemeToggle />
      </div>

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Search
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>
          Categories
        </NavLink>
        <NavLink to="/trendings" className={({ isActive }) => (isActive ? 'active' : '')}>
          Trending
        </NavLink>
        <NavLink to="/top-tools" className={({ isActive }) => (isActive ? 'active' : '')}>
          Top Tools
        </NavLink>
        <NavLink to="/tools" className={({ isActive }) => (isActive ? 'active' : '')}>
          All Tools
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        {/* <span>Backend connected</span>
        <strong>localhost:8000</strong> */}
        <p>Search, trends, and filters are all powered by the same API.</p>
      </div>
    </aside>
  )
}
