import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import SearchPage from './pages/SearchPage'
import CategoriesPage from './pages/CategoriesPage'
import TrendingsPage from './pages/TrendingsPage'
import TopToolsPage from './pages/TopToolsPage'
import ToolsPage from './pages/ToolsPage'

function App() {
  return (
    <div className="app-shell layout-with-sidebar">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/trendings" element={<TrendingsPage />} />
          <Route path="/top-tools" element={<TopToolsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
