'use client'
export default function HeroSlider(){
  return (
    <section className="relative">
      <div className="h-64 md:h-96 rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500 to-sky-400 text-white flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold">Featured: The Future of Mobility</h1>
          <p className="mt-4 max-w-xl">In-depth stories on cars, bikes, smartphones and EV innovation.</p>
        </div>
      </div>
    </section>
  )
}
