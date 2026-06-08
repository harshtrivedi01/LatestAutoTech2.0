import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

async function getLatestPosts() {
  try {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.PORT || 3000}`
        : process.env.NEXT_PUBLIC_API_URL || `http://localhost:${process.env.PORT || 3000}`;

    const res = await fetch(`${baseUrl}/api/blogs?limit=5`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const metadata = {
  title: "Latest Auto Tech - Cars, Bikes, Smartphones & EV News",
  description:
    "Latest news and articles about cars, bikes, smartphones, and electric vehicles",
};

export default async function Home() {
  const posts = await getLatestPosts();

  const featuredPost = posts?.[0];
  const sidePosts = posts?.slice(1, 5);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <Navbar />

     <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex-1">

  {/* FEATURED SECTION */}
  <section className="mt-2 md:mt-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

      {/* FEATURED POST */}
      {featuredPost && (
        <Link
          href={`/blog/${featuredPost?.slug || featuredPost?._id}`}
          className="lg:col-span-2 relative overflow-hidden rounded-2xl group h-[200px] sm:h-[400px] lg:h-[550px]"
        >
          <img
            src={
              featuredPost?.featuredImage ||
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&auto=format&fit=crop"
            }
            alt={featuredPost?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-0 left-0 p-4 md:p-6 z-10 text-white">
            <span className="bg-black/70 text-[10px] sm:text-xs uppercase font-semibold px-3 py-1 rounded-full">
              {featuredPost?.category?.name ||
                featuredPost?.category ||
                "Car News"}
            </span>

            <h1 className="mt-3 text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-tight">
              {featuredPost?.title}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-gray-200">
              {featuredPost?.author || "Admin"} •{" "}
              {featuredPost?.createdAt
                ? new Date(
                    featuredPost.createdAt
                  ).toLocaleDateString()
                : ""}
            </p>
          </div>
        </Link>
      )}

      {/* SIDE POSTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
        {sidePosts?.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="relative overflow-hidden rounded-2xl group h-[220px] sm:h-[250px]"
          >
            <img
              src={
                post?.featuredImage ||
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
              }
              alt={post?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute bottom-0 left-0 p-4 z-10 text-white">
              <span className="bg-black/70 text-[10px] uppercase font-semibold px-2 py-1 rounded-full">
                {post?.category?.name ||
                  post?.category ||
                  "Car News"}
              </span>

              <h2 className="mt-2 text-base sm:text-lg font-bold leading-snug line-clamp-2">
                {post?.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

    </div>
  </section>

  {/* LATEST ARTICLES */}
  <section className="mt-10 md:mt-14">
    <h2 className="text-2xl md:text-3xl font-bold">
      Latest Articles
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mt-6">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post?._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={
                post?.featuredImage ||
                "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
              }
              alt={post?.title}
              className="w-full h-[200px] sm:h-[220px] object-cover"
            />

            <div className="p-4 md:p-5">
              <span className="text-xs uppercase bg-gray-100 px-3 py-1 rounded-full">
                {post?.category?.name ||
                  post?.category ||
                  "News"}
              </span>

              <h3 className="mt-3 text-lg md:text-xl font-bold line-clamp-2">
                {post?.title}
              </h3>

              <p className="mt-2 text-slate-600 text-sm line-clamp-3">
                {post?.excerpt ||
                  "Read the latest automobile and technology updates."}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center mt-4 text-blue-600 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-slate-600 py-10">
          No posts available yet.
        </div>
      )}
    </div>
  </section>

</main>

      <Footer />
    </div>
  );
}