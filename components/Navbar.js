'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Search, Car } from 'lucide-react'
import Image from 'next/image'
import logo from '../public/uploads/pictures/logo.png'
import Icon from '../public/uploads/pictures/site icon.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(event) {
    event.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
  }

  const navLinks = [
    { name: 'Cars', href: '/cars' },
    { name: 'Bikes', href: '/bikes' },
    { name: 'Smartphones', href: '/smartphones' },
    { name: 'EV', href: '/ev' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl text-white flex items-center justify-center  group-hover:scale-105 transition duration-300">
              <Image src={Icon} alt="Car Icon"  size={22} />
            </div>

            <div className="leading-tight">
              <Image src={logo} alt="Car Icon"  height={22} />
              <p className="text-xs text-gray-500 font-medium">
                Cars • Bikes • EV • Tech
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 rounded-full text-[15px] font-medium text-gray-700 hover:bg-black hover:text-white transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2"
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search articles..."
              className="border-none outline-none bg-transparent text-sm text-gray-700 w-40"
            />
            <button type="submit" className="text-gray-500 hover:text-black transition duration-200">
              <Search size={18} />
            </button>
          </form>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? 'max-h-[400px] pb-6' : 'max-h-0'
          }`}
        >
          <div className="pt-4 flex flex-col gap-3">
            <form onSubmit={handleSearch} className="px-4 py-2 rounded-xl bg-gray-100 flex items-center gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                placeholder="Search articles..."
                className="w-full border-none bg-transparent outline-none text-sm text-gray-700"
              />
              <button type="submit" className="text-gray-500 hover:text-black transition duration-200">
                <Search size={18} />
              </button>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-black hover:text-white transition duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}