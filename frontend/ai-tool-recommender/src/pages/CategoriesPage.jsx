import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJson('/categories')
      .then((d) => setCategories(d.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="content-card">
      <div className="panel-header">
        <h2>Categories</h2>
        <p>Available domains detected in the catalog.</p>
      </div>

      <div className="list-card">
        {loading ? (
          <p className="empty-state">Loading categories...</p>
        ) : categories.length ? (
          <ul>
            {categories.map((c) => (
              <li key={c.domain}>
                <strong>{c.domain}</strong>
                <span>{c.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No categories found.</p>
        )}
      </div>
    </section>
  )
}
