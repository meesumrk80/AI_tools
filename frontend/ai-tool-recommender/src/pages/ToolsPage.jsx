import { useState } from 'react'
import { fetchJson } from '../api'

export default function ToolsPage() {
  const [domain, setDomain] = useState('')
  const [intType, setIntType] = useState('')
  const [limit, setLimit] = useState(20)
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        limit: String(limit),
        domain,
        intelligence_type: intType,
      })
      const d = await fetchJson(`/tools?${params.toString()}`)
      setTools(d.tools || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="content-card">
      <div className="panel-header">
        <h2>Tools</h2>
        <p>Browse the full list with filters.</p>
      </div>

      <form className="filter-form" onSubmit={submit}>
        <label>
          Domain
          <input value={domain} onChange={(e) => setDomain(e.target.value)} />
        </label>
        <label>
          Intelligence
          <input value={intType} onChange={(e) => setIntType(e.target.value)} />
        </label>
        <label>
          Limit
          <input
            type="number"
            min={1}
            max={200}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </label>
        <button type="submit">Fetch</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="result-grid">
        {loading ? (
          <p className="empty-state">Loading tools...</p>
        ) : tools.length ? (
          tools.map((t) => (
          <article key={t.tool_name} className="tool-card">
            <div className="tool-card__head">
              <span className="tool-score">{t.popularity_votes.toLocaleString()}</span>
              <span className="tool-domain">votes</span>
            </div>
            <h3>{t.tool_name}</h3>
            <p>{t.functionality}</p>
            <div className="meta-row">
              <span>{t.domain}</span>
              <span>{t.intelligence_type}</span>
            </div>
            <div className="footer-row">
              <span>{t.popularity_votes.toLocaleString()} votes</span>
              <a href={t.website} target="_blank" rel="noreferrer">
                Visit site
              </a>
            </div>
          </article>
          ))
        ) : (
          <p className="empty-state">Use the filters to load tools.</p>
        )}
      </div>
    </section>
  )
}
