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
                <button onClick={()=>{ setEditing(null); setShowForm(true) }} className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700">New Post</button>
              </div>
            </div>

            {error && <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 overflow-x-auto">
              {loading ? (
                <div className="text-slate-500">Loading posts…</div>
              ) : (
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold">Title</th>
                      <th className="px-4 py-4 text-left font-semibold">Category</th>
                      <th className="px-4 py-4 text-left font-semibold">Status</th>
                      <th className="px-4 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {posts.map(p=> (
                      <tr key={p._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 font-medium text-slate-900">{p.title}</td>
                        <td className="px-4 py-4 text-slate-600">{p.category?.name || 'Uncategorized'}</td>
                        <td className="px-4 py-4 text-slate-600">{p.published ? 'Published' : 'Draft'}</td>
                        <td className="px-4 py-4 space-x-3">
                          <button onClick={()=>{ setEditing(p); setShowForm(true) }} className="font-medium text-indigo-600 hover:text-indigo-800">Edit</button>
                          <button onClick={()=>handleDelete(p._id)} className="font-medium text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {showForm && (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
                <PostForm post={editing} onDone={()=>{ setShowForm(false); load() }} />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
