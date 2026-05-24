import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import SearchPage from './pages/SearchPage'
import CategoriesPage from './pages/CategoriesPage'
import TrendingsPage from './pages/TrendingsPage'
import TopToolsPage from './pages/TopToolsPage'
import ToolsPage from './pages/ToolsPage'

const heroStats = [
  { value: '5', label: 'live routes' },
  { value: '1', label: 'shared API' },
  { value: '100%', label: 'connected UI' },
]

const heroPills = ['Semantic search', 'Fast filters', 'Clean trends', 'Polished hover states']

function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <div className="layout-with-sidebar">
        <Sidebar />

        <main className="main-content">
          <section className="hero panel">
            <div className="hero-copy">
              <p className="eyebrow">Connected AI tool workspace</p>
              <h1>Find the right AI tool faster.</h1>
              <p className="hero-description">
                Search the recommendation engine, inspect trending tools, and browse the catalog
                through one polished interface that stays connected to the same backend.
              </p>

              <div className="hero-pills" aria-label="Highlights">
                {heroPills.map((pill) => (
                  <span key={pill} className="hero-pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-card">
              <div>
                <p className="hero-card-label">Live workspace</p>
                <h2>Everything is wired to the FastAPI backend.</h2>
              </div>

              <div className="hero-stats">
                {heroStats.map((stat) => (
                  <article key={stat.label} className="hero-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="page-stack">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/trendings" element={<TrendingsPage />} />
              <Route path="/top-tools" element={<TopToolsPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
