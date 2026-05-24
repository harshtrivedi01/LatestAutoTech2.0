import connect from '../../../lib/mongoose'
import Blog from '../../../models/Blog'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export async function generateMetadata({ params }){
  const { slug } = params
  await connect()
  const post = await Blog.findOne({ slug })
  return {
    title: post?.title || 'Blog Post | Latest Auto Tech',
    description: post?.description || 'Read the latest article'
  }
}

export default async function BlogPage({ params }){
  const { slug } = params
  await connect()
  const post = await Blog.findOne({ slug }).populate('category')
  const readingTime = post?.content ? Math.ceil(post.content.length / 200) : 0

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-1 text-center">
          <h1 className="text-2xl">Post not found</h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1 max-w-3xl">
        {post.featuredImage && (
          <img src={post.featuredImage} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-6" />
        )}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-indigo-600 font-medium">{post.category?.name || 'Uncategorized'}</span>
          <span className="text-sm text-slate-500">•</span>
          <span className="text-sm text-slate-500">{readingTime} min read</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-slate-600 mb-8 pb-4 border-b">
          <div>
            <span className="font-semibold">By {post.author || 'Admin'}</span>
            <span className="ml-2">•</span>
            <span className="ml-2">{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
          </div>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">{tag}</span>
            ))}
          </div>
        )}
        
        <div className="prose max-w-none mb-8">
          {post.description && <p className="text-lg text-slate-600 mb-6">{post.description}</p>}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>

        <div className="mt-12 pt-6 border-t">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">About the Author</h3>
            <p className="text-slate-700">{post.author || 'Admin User'}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
