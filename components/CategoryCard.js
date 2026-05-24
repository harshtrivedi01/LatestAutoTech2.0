export default function CategoryCard({title, description}){
  return (
    <div className="p-6 bg-white/60 backdrop-blur rounded-lg shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-slate-600 mt-2">{description}</p>
    </div>
  )
}
