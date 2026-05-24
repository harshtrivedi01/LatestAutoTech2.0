import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BlogCard from '../../components/BlogCard'

async function getCategoryPosts(categoryName) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blogs`, { cache: 'no-store' })
    if (!res.ok) return []
    const posts = await res.json()
    return posts.filter(p => p.category?.name === categoryName)
  } catch (err) {
    return []
  }
}

export const metadata = {
  title: 'Cars - Latest News & Reviews | Latest Auto Tech',
  description: 'Latest car news, reviews, and automotive articles'
}

export default async function Cars(){
  const posts = await getCategoryPosts('Cars')
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold">Cars</h1>
        <p className="mt-2 text-slate-600">Latest car news, reviews, and automotive articles</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {posts && posts.length > 0 ? (
            posts.map(post => <BlogCard key={post._id} post={post} />)
          ) : (
            <div className="col-span-3 text-center text-slate-600">No car articles available yet.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
