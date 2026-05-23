import { useState } from 'react'
import { fetchJson } from '../api'

export default function SearchPage(){
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSearch = async (e) =>{
    e.preventDefault()
    if(!q.trim()) return setResults([])
    setLoading(true); setError(null)
    try{
      const data = await fetchJson(`/search?query=${encodeURIComponent(q)}`)
      setResults(data.recommendations || [])
    }catch(err){ setError(err.message) }
    finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="panel-header"><h2>Search</h2><p>Semantic search recommendations</p></div>
      <form className="search-form" onSubmit={onSearch}>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="e.g. Generate ad copy for coffee" />
        <button type="submit" disabled={loading}>{loading? 'Searching…':'Search'}</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      <div className="result-grid">
        {results.map(r => (
          <article key={r.tool_name} className="tool-card">
            <h3>{r.tool_name}</h3>
            <p>{r.functionality}</p>
            <div className="meta-row"><span>{r.domain}</span><span>{r.pricing}</span></div>
            <a href={r.website} target="_blank" rel="noreferrer">Visit</a>
          </article>
        ))}
      </div>
    </div>
  )
}
