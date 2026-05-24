import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

async function getLatestPosts() {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/blogs?limit=5`,
      {
        cache: "no-store",
      }
    );

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

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* FEATURED SECTION */}
        <section className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {/* LEFT BIG CARD */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost?.slug || featuredPost?._id}`}
                className="lg:col-span-2 relative overflow-hidden group h-[500px]"
              >
                {/* IMAGE */}
                <img
                  src={
                    featuredPost?.featuredImage ||
                    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&auto=format&fit=crop"
                  }
                  alt={featuredPost?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/45"></div>

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 p-6 z-10 text-white">
                  <span className="bg-black/70 text-[11px] uppercase font-semibold px-3 py-1">
                    {featuredPost?.category?.name ||
                      featuredPost?.category ||
                      "Car News"}
                  </span>

                  <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
                    {featuredPost?.title}
                  </h1>

                  <p className="mt-4 text-sm text-gray-200">
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

            {/* RIGHT GRID */}
            <div className="grid grid-cols-2 gap-2">
              {sidePosts?.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative overflow-hidden group h-[245px]"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      post?.featuredImage ||
                      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={post?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/45"></div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 p-4 z-10 text-white">
                    <span className="bg-black/70 text-[10px] uppercase font-semibold px-2 py-1">
                      {post?.category?.name ||
                        post?.category ||
                        "Car News"}
                    </span>

                    <h2 className="mt-3 text-lg md:text-xl font-bold leading-snug line-clamp-3">
                      {post?.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST ARTICLES */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post?._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      post?.featuredImage ||
                      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={post?.title}
                    className="w-full h-[220px] object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-5">
                    <span className="text-xs uppercase bg-gray-100 px-3 py-1 rounded-full">
                      {post?.category?.name ||
                        post?.category ||
                        "News"}
                    </span>

                    <h3 className="mt-4 text-xl font-bold line-clamp-2">
                      {post?.title}
                    </h3>

                    <p className="mt-3 text-slate-600 text-sm line-clamp-3">
                      {post?.excerpt ||
                        "Read the latest automobile and technology updates."}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-slate-600">
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