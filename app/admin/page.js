'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Admin(){
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token) router.push('/admin/dashboard')
  }, [router])

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login',{method:'POST',body:JSON.stringify({email:e.target.email.value,password:e.target.password.value}),headers:{'Content-Type':'application/json'}})
    const data = await res.json()
    setLoading(false)
    if(res.ok && data.token){
      localStorage.setItem('token', data.token)
      router.push('/admin/dashboard')
    } else {
      setError(data.error || 'Invalid login credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-white/95 backdrop-blur-xl">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-100/80">Admin Portal</p>
          <h1 className="mt-4 text-4xl font-semibold">Latest Auto Control Center</h1>
          <p className="mt-3 max-w-2xl text-sm text-indigo-100/80">
            Sign in to manage articles, categories and subscribers with a beautiful admin interface.
          </p>
        </div>

        <div className="px-8 py-8 bg-slate-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input name="email"  required className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="hello@latestauto.com" />

            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" required className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Enter your password" />

            <button type="submit" disabled={loading} className="w-full rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          {error && <div className="mt-4 rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        </div>
      </div>
    </div>
  )
}
