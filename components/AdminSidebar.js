'use client'
import Link from 'next/link'
export default function AdminSidebar(){
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/50">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-indigo-600 font-semibold">Admin Panel</div>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">Latest Auto</h2>
        <p className="mt-3 text-sm text-slate-500">Fast access to posts, categories, and newsletter subscribers.</p>
      </div>

      <nav className="space-y-2">
        <Link href="/admin/dashboard" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">Dashboard</Link>
        <Link href="/admin/posts" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">Posts</Link>
        <Link href="/admin/categories" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">Categories</Link>
        <Link href="/admin/subscribers" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">Subscribers</Link>
        <button onClick={()=>{ localStorage.removeItem('token'); window.location.href='/' }} className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50">Logout</button>
      </nav>
    </div>
  )
}
