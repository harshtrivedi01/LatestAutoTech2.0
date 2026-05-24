'use client'
import { useState, useEffect, useRef } from 'react'

const formattingButtons = [
  { label: 'B', command: 'bold' },
  { label: 'I', command: 'italic' },
  { label: 'U', command: 'underline' },
  { label: 'H1', command: 'formatBlock', value: 'H1' },
  { label: 'Quote', command: 'formatBlock', value: 'BLOCKQUOTE' },
  { label: 'UL', command: 'insertUnorderedList' },
  { label: 'OL', command: 'insertOrderedList' },
  { label: 'Link', command: 'createLink' }
]

export default function PostForm({ post, onDone }){
  const [title,setTitle]=useState(post?.title||'')
  const [slug,setSlug]=useState(post?.slug||'')
  const [desc,setDesc]=useState(post?.description||'')
  const [content,setContent]=useState(post?.content||'')
  const [category,setCategory]=useState(post?.category?._id||'')
  const [author,setAuthor]=useState(post?.author||'')
  const [featuredImage,setFeaturedImage]=useState(post?.featuredImage||'')
  const [tags,setTags]=useState((post?.tags||[]).join(','))
  const [cats,setCats]=useState([])
  const editorRef = useRef(null)

  useEffect(()=>{
    fetch('/api/categories')
      .then(r=>r.json())
      .then(d=>setCats(d))
      .catch(()=>setCats([]))
  }, [])

  useEffect(()=>{
    setTitle(post?.title||'')
    setSlug(post?.slug||'')
    setDesc(post?.description||'')
    setContent(post?.content||'')
    setCategory(post?.category?._id||'')
    setAuthor(post?.author||'')
    setFeaturedImage(post?.featuredImage||'')
    setTags((post?.tags||[]).join(','))
  }, [post])

  useEffect(()=>{
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || ''
    }
  }, [content])

  function applyFormat(button) {
    if (button.command === 'createLink') {
      const url = window.prompt('Enter URL', 'https://')
      if (url) document.execCommand(button.command, false, url)
      return
    }

    document.execCommand(button.command, false, button.value || null)
    setContent(editorRef.current?.innerHTML || '')
  }

  async function handleSubmit(e){
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(!token){
      alert('Please login first')
      return
    }
    const payload = { title, slug, description: desc, content, category, author, featuredImage, tags: tags.split(',').map(s=>s.trim()).filter(Boolean) }
    const method = post?._id ? 'PUT' : 'POST'
    const url = post?._id ? '/api/blogs/'+post._id : '/api/blogs'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }, body: JSON.stringify(payload) })
    if(res.ok){
      onDone()
    }else{
      const errorData = await res.json().catch(()=>({}))
      alert(errorData.error || 'Error saving post')
    }
  }

  async function handleUpload(e){
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = async ()=>{
      const base = reader.result
      const filename = Date.now() + '-' + file.name.replace(/\s+/g,'-')
      const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename, data: base }) })
      const json = await res.json()
      if(json.url) setFeaturedImage(json.url)
    }
    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Slug</label>
              <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="Slug" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Author</label>
              <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                <option value="">Select category</option>
                {cats.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Tags</label>
            <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags,comma,separated" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Short description</label>
            <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Featured image</label>
              <input type="file" onChange={handleUpload} className="w-full text-sm text-slate-600" />
            </div>
            <div className="flex items-end">
              {featuredImage ? (
                <img src={featuredImage} alt="featured" className="h-28 w-full rounded-3xl object-cover" />
              ) : (
                <div className="flex h-28 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">No image selected</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Post content</label>
                <p className="text-xs text-slate-500">Use the editor toolbar below to format your article.</p>
              </div>
              <span className="text-xs text-slate-500">HTML content stored</span>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {formattingButtons.map((button)=> (
                  <button
                    key={button.label}
                    type="button"
                    onClick={()=>applyFormat(button)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              <div
                ref={editorRef}
                onInput={(e)=>setContent(e.currentTarget.innerHTML)}
                contentEditable
                suppressContentEditableWarning
                className="mt-3 min-h-[320px] rounded-3xl bg-white p-4 text-sm leading-6 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onDone} className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto">Cancel</button>
        <button type="submit" className="w-full rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 sm:w-auto">Save post</button>
      </div>
    </form>
  )
}
