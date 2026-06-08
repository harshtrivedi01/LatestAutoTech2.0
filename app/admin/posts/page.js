'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '../../../components/AdminSidebar'
import PostForm from '../../../components/PostForm'

export default function AdminPosts(){
  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(true)
  const [editing,setEditing]=useState(null)
  const [showForm,setShowForm]=useState(false)
  const [error,setError]=useState('')
  const router = useRouter()

  async function load(){
    setLoading(true)
    setError('')
    const res = await fetch('/api/blogs')
    if(!res.ok){
      setError('Failed to load posts')
      setLoading(false)
      return
    }
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) return router.push('/admin')
    load()
  }, [router])

  async function handleDelete(id){
    if(!confirm('Delete this post?')) return
    const token = localStorage.getItem('token')
    const res = await fetch('/api/blogs/'+id, { method: 'DELETE', headers: { 'Authorization': 'Bearer '+token } })
    if(res.ok){
      load()
    } else {
      setError('Unable to delete post')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside>
            <AdminSidebar />
          </aside>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 font-semibold">Posts</p>
                  <h1 className="text-3xl font-bold text-slate-900">Manage Articles</h1>
                  <p className="mt-2 text-sm text-slate-500">Create, edit, and publish content for the site.</p>
                </div>
                <button
                  onClick={() => {
                    setEditing(null)
                    setShowForm(true)
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
                >
                  New Post
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
              {loading ? (
                <div className="text-slate-500">Loading posts…</div>
              ) : posts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                  No posts yet. Click “New Post” to add your first article.
                </div>
              ) : (
                <div className="grid gap-4">
                  {posts.map((p) => (
                    <article key={p._id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                            <span className="rounded-full bg-white px-3 py-1 shadow-sm">{p.category?.name || 'Uncategorized'}</span>
                            <span className="rounded-full bg-white px-3 py-1 shadow-sm">{p.published ? 'Published' : 'Draft'}</span>
                          </div>
                          <h2 className="mt-4 text-xl font-semibold text-slate-900 line-clamp-2">{p.title}</h2>
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.description || 'No description available.'}</p>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm">
                          <button
                            onClick={() => {
                              setEditing(p)
                              setShowForm(true)
                            }}
                            className="rounded-full border border-indigo-200 bg-white px-4 py-2 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="rounded-full border border-red-200 bg-white px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span>Author: {p.author || 'Admin'}</span>
                        <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-stretch bg-black/40 p-4 backdrop-blur-sm md:p-8">
          <div className="relative mx-auto w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-900/20">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"
            >
              ×
            </button>
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 font-semibold">Article editor</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{editing ? 'Edit Post' : 'New Post'}</h2>
              <p className="mt-2 text-sm text-slate-500">Manage the article content separately from the post list.</p>
            </div>
            <PostForm post={editing} onDone={() => { setShowForm(false); load() }} />
          </div>
        </div>
      )}
    </div>
  )
}
