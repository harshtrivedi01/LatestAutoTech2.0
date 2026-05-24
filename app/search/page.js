import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Link from "next/link"

async function getSearchResults(query) {
  if (!query) return []

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/blogs?q=${encodeURIComponent(
        query
      )}`,
      {
        cache: "no-store",
      }
    )

    if (!res.ok) return []
    return await res.json()
  } catch (err) {
    console.error(err)
    return []
  }
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || ""
  const posts = await getSearchResults(query)

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <section className="mb-8">
          <h1 className="text-4xl font-bold">Search results</h1>
          <p className="mt-2 text-sm text-gray-600">
            {query
              ? `Showing results for "${query}"`
              : "Enter a search term in the navbar to find articles."}
          </p>
        </section>

        {query ? (
          posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                >
                  <img
                    src={
                      post?.featuredImage ||
                      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={post?.title}
                    className="w-full h-[220px] object-cover"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase bg-gray-100 px-3 py-1 rounded-full">
                      {post?.category?.name || post?.category || "News"}
                    </span>
                    <h2 className="mt-4 text-xl font-bold line-clamp-2">{post?.title}</h2>
                    <p className="mt-3 text-slate-600 text-sm line-clamp-3">
                      {post?.excerpt || "Read more about the latest in cars, bikes, EVs, and tech."}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 shadow-sm text-center">
              <h2 className="text-2xl font-semibold">No results found</h2>
              <p className="mt-3 text-gray-600">
                Try a different keyword, category, or phrase.
              </p>
            </div>
          )
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-sm text-center">
            <h2 className="text-2xl font-semibold">Search for posts</h2>
            <p className="mt-3 text-gray-600">Use the search box above to find articles by title, description, or tags.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
