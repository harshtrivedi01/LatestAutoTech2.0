import Link from 'next/link'

export default function BlogCard({ post }) {
  if (!post) {
    return (
      <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="h-44 bg-slate-200 animate-pulse" />
        <div className="p-4">
          <div className="h-4 bg-slate-200 w-12 animate-pulse"></div>
          <div className="h-6 bg-slate-200 w-32 mt-2 animate-pulse"></div>
          <div className="h-4 bg-slate-200 w-full mt-2 animate-pulse"></div>
        </div>
      </article>
    )
  }

  const readingTime = Math.ceil((post.content?.length || 0) / 200)
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer h-full flex flex-col">
        {post.featuredImage && (
          <img src={post.featuredImage} alt={post.title} className="h-44 w-full object-cover" />
        )}
        {!post.featuredImage && <div className="h-44 bg-gradient-to-r from-indigo-200 to-blue-200" />}
        <div className="p-4 flex-1 flex flex-col">
          <div className="text-sm text-indigo-600 font-medium">{post.category?.name || 'Uncategorized'}</div>
          <h3 className="font-semibold text-lg mt-2 line-clamp-2">{post.title}</h3>
          <p className="text-sm text-slate-600 mt-2 line-clamp-2 flex-1">{post.description || 'No description'}</p>
          <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
            <span>{post.author || 'Admin'}</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
