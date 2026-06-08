'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '../../../components/AdminSidebar'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) router.push('/admin')
  }, [router])

  useEffect(() => {
    loadSubscribers()
  }, [])

  async function loadSubscribers() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/subscribers')
      if (!res.ok) throw new Error('Unable to load subscribers')
      const data = await res.json()
      setSubscribers(data)
    } catch (err) {
      setError(err.message || 'Failed to load subscribers')
    } finally {
      setLoading(false)
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
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-600 font-semibold">Subscribers</p>
                <h1 className="text-3xl font-bold text-slate-900">Manage Subscribers</h1>
                <p className="mt-2 text-sm text-slate-500">View your newsletter subscribers and keep the list organized.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {subscribers.length} subscriber{subscribers.length === 1 ? '' : 's'}
              </div>
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
                    <h2 className="text-2xl font-semibold text-slate-900">Subscriber list</h2>
                    <p className="mt-1 text-sm text-slate-500">Recent subscribers are shown below.</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                    {loading ? 'Loading...' : `${subscribers.length} total`}
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  {loading ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">Loading subscribers…</div>
                  ) : subscribers.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                      No subscribers yet. Subscribers will appear here once they sign up.
                    </div>
                  ) : (
                    subscribers.map((subscriber) => (
                      <article key={subscriber._id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{subscriber.email}</h3>
                            <p className="mt-1 text-sm text-slate-600">Joined {new Date(subscriber.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Subscriber</div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
                <h2 className="text-2xl font-semibold text-slate-900">Subscriber growth</h2>
                <p className="mt-2 text-sm text-slate-500">Keep your list growing by sharing your newsletter signup form on social media.</p>
                <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  Subscriber emails are stored securely and can be used to send newsletters or updates.
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
                <h3 className="text-lg font-semibold text-slate-900">Tips</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>Encourage visitors to subscribe with a clear call-to-action.</li>
                  <li>Offer exclusive updates or content in your newsletter.</li>
                  <li>Use short, readable email entries for faster scanning.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}
