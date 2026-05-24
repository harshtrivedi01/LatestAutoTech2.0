export default function Footer(){
  return (
    <footer className="bg-slate-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} Latest Auto Tech</div>
          
        </div>
      </div>
    </footer>
  )
}
