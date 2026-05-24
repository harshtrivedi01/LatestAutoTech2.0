'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminSidebar from '../../../components/AdminSidebar'

export default function AdminDashboard(){
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) router.push('/admin')
  }, [router])

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside>
            <AdminSidebar />
          </aside>

          <section>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 font-semibold">Welcome back</p>
                  <h1 className="mt-3 text-4xl font-bold text-slate-900">Admin Dashboard</h1>
                  <p className="mt-3 max-w-2xl text-sm text-slate-500">Manage your latest auto articles, categories and newsletter subscribers from one modern workspace.</p>
                </div>
                <Link href="/admin/posts" className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700">
                  Create new post
                </Link>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Posts</p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-900">Manage</h2>
                  <p className="mt-3 text-sm text-slate-500">Create and edit articles quickly with a simple workflow.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Categories</p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-900">Organize</h2>
                  <p className="mt-3 text-sm text-slate-500">Control categories and filter content across your site.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Subscribers</p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-900">Grow</h2>
                  <p className="mt-3 text-sm text-slate-500">Keep track of newsletter signups and reader interest.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
