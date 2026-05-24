import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function TrendingsPage() {
  const [trendings, setTrendings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJson('/trendings?limit=20')
      .then((d) => setTrendings(d.trendings || []))
      .catch(() => setTrendings([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="content-card">
      <div className="panel-header">
        <h2>Trending</h2>
        <p>Most popular tools ranked by vote count.</p>
      </div>

      <div className="list-card">
        {loading ? (
          <p className="empty-state">Loading trending tools...</p>
        ) : trendings.length ? (
          <ol>
            {trendings.map((t) => (
              <li key={t.tool_name}>
                <div>
                  <strong>{t.tool_name}</strong>
                  <p>{t.domain}</p>
                </div>
                <span>{t.popularity_votes.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty-state">No trending tools found.</p>
        )}
      </div>
    </section>
  )
}
