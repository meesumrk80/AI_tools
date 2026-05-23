import { useState } from 'react'
import { fetchJson } from '../api'

export default function TopToolsPage(){
  const [domain, setDomain] = useState('')
  const [intType, setIntType] = useState('')
  const [limit, setLimit] = useState(10)
  const [tools, setTools] = useState([])

  const submit = async (e)=>{
    e.preventDefault()
    const params = new URLSearchParams({limit: String(limit), domain, intelligence_type: intType})
    const d = await fetchJson(`/top-tools?${params.toString()}`)
    setTools(d.top_tools||[])
  }

  return (
    <div>
      <div className="panel-header"><h2>Top Tools</h2><p>Filtered by domain or intelligence type</p></div>
      <form className="filter-form" onSubmit={submit}>
        <label>Domain<input value={domain} onChange={(e)=>setDomain(e.target.value)} /></label>
        <label>Intelligence<input value={intType} onChange={(e)=>setIntType(e.target.value)} /></label>
        <label>Limit<input type="number" min={1} max={100} value={limit} onChange={(e)=>setLimit(Number(e.target.value))} /></label>
        <button type="submit">Fetch</button>
      </form>

      <div className="result-grid">
        {tools.map(t=> (
          <article key={t.tool_name} className="tool-card">
            <h3>{t.tool_name}</h3>
            <p>{t.functionality}</p>
            <div className="meta-row"><span>{t.domain}</span><span>{t.intelligence_type}</span></div>
            <div className="footer-row"><span>{t.popularity_votes.toLocaleString()} votes</span><a href={t.website} target="_blank" rel="noreferrer">Visit</a></div>
          </article>
        ))}
      </div>
    </div>
  )
}
