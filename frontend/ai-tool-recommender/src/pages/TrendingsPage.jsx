import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function TrendingsPage(){
  const [trendings, setTrendings] = useState([])
  useEffect(()=>{
    fetchJson('/trendings?limit=20').then(d=>setTrendings(d.trendings||[])).catch(()=>{})
  },[])

  return (
    <div>
      <div className="panel-header"><h2>Trending</h2><p>Popular tools</p></div>
      <div className="list-card">
        <ol>
          {trendings.map(t=> (
            <li key={t.tool_name}><div><strong>{t.tool_name}</strong><p>{t.domain}</p></div><span>{t.popularity_votes.toLocaleString()}</span></li>
          ))}
        </ol>
      </div>
    </div>
  )
}
