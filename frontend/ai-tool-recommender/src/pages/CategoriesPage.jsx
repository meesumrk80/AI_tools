import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function CategoriesPage(){
  const [categories, setCategories] = useState([])
  useEffect(()=>{
    fetchJson('/categories').then(d=>setCategories(d.categories||[])).catch(()=>{})
  },[])

  return (
    <div>
      <div className="panel-header"><h2>Categories</h2><p>Available domains</p></div>
      <div className="list-card">
        <ul>
          {categories.map(c=> (
            <li key={c.domain}><strong>{c.domain}</strong><span>{c.count}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
