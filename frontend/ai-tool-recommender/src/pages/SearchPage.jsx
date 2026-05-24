import { useState } from 'react'
import { fetchJson } from '../api'

const quickPrompts = [
  'generate social media copy',
  'design a logo for my startup',
  'summarize research papers',
  'build a presentation outline',
]

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSearch = async (e) => {
    e.preventDefault()
    if (!q.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await fetchJson(`/search?query=${encodeURIComponent(q)}`)
      setResults(data.recommendations || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="content-card">
      <div className="panel-header">
        <h2>Search</h2>
        <p>Semantic search recommendations powered by the backend model.</p>
      </div>

      <form className="search-form" onSubmit={onSearch}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. Generate ad copy for coffee"
          aria-label="Search for an AI tool need"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      <div className="chip-row" aria-label="Quick prompts">
        {quickPrompts.map((prompt) => (
          <button key={prompt} type="button" className="chip" onClick={() => setQ(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && <div className="empty-state">Searching the tool catalog...</div>}

      {!loading && q.trim() && !results.length && !error && (
        <div className="empty-state">No recommendations yet. Try a broader prompt.</div>
      )}

      <div className="result-grid">
        {results.map((r) => (
          <article key={r.tool_name} className="tool-card">
            <div className="tool-card__head">
              <span className="tool-score">{Math.round((r.score || 0) * 100)}%</span>
              <span className="tool-domain">{r.domain}</span>
            </div>
            <h3>{r.tool_name}</h3>
            <p>{r.functionality}</p>
            <div className="meta-row">
              <span>{r.pricing}</span>
              <span>Match score</span>
            </div>
            <a href={r.website} target="_blank" rel="noreferrer">
              Visit site
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
