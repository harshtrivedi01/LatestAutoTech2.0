'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '../../../components/AdminSidebar'

export default function AdminCategories(){
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) router.push('/admin')
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="col-span-1">
          <AdminSidebar />
        </aside>
        <section className="col-span-3 bg-white rounded shadow p-6">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="mt-4 text-slate-600">Category management will be available here soon.</p>
        </section>
      </div>
    </div>
  )
}
