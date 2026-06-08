'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '../../../components/AdminSidebar'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) router.push('/admin')
  }, [router])

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/categories')
      if (!res.ok) throw new Error('Unable to load categories')
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      setError(err.message || 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !slug.trim()) {
      setError('Name and slug are required.')
      return
    }

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), slug: slug.trim(), description: description.trim() })
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Unable to create category')
      }

      setName('')
      setSlug('')
      setDescription('')
      setShowForm(false)
      loadCategories()
    } catch (err) {
      setError(err.message || 'Unable to create category')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside>
          <AdminSidebar />
        </aside>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-600 font-semibold">Categories</p>
                <h1 className="text-3xl font-bold text-slate-900">Manage Categories</h1>
                <p className="mt-2 text-sm text-slate-500">Create and organize categories used across your blog.</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
              >
                New Category
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Category list</h2>
                    <p className="mt-1 text-sm text-slate-500">Your active categories appear here.</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                    {categories.length} total
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  {loading ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">Loading categories…</div>
                  ) : categories.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                      No categories yet. Add a category to organize your articles.
                    </div>
                  ) : (
                    categories.map((category) => (
                      <article key={category._id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="text-xl font-semibold text-slate-900 truncate">{category.name}</h3>
                            <p className="mt-2 text-sm text-slate-600 truncate">{category.description || 'No description provided.'}</p>
                          </div>
                          <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                            {category.slug}
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
                <h2 className="text-2xl font-semibold text-slate-900">Quick actions</h2>
                <p className="mt-2 text-sm text-slate-500">Use the form to add new categories without leaving this page.</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    Categories help visitors find the right posts faster.
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    Keep slugs short and lowercase for cleaner URLs.
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
                <h3 className="text-lg font-semibold text-slate-900">Hints</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>Use descriptive category names for better navigation.</li>
                  <li>Add a short description to explain the category purpose.</li>
                  <li>Slug values should be URL-safe and unique.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-stretch bg-black/40 p-4 backdrop-blur-sm md:p-8">
          <div className="relative mx-auto w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-900/20">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"
            >
              ×
            </button>

            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 font-semibold">New category</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Add a category</h2>
              <p className="mt-2 text-sm text-slate-500">Create a new category for your blog posts.</p>
            </div>

            <form onSubmit={handleCreate} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Category name"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Slug</span>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="category-slug"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-700">
                <span>Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  rows={4}
                  placeholder="Short description (optional)"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 sm:w-auto"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
