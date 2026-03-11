"use client"

export default function Categories() {

  const categories = [
    "All",
    "Apartments",
    "Villas",
    "Beach",
    "Luxury",
    "Cheap",
    "Popular"
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">

      {categories.map(cat => (
        <button
          key={cat}
          className="px-4 py-2 bg-white border rounded-full text-sm whitespace-nowrap"
        >
          {cat}
        </button>
      ))}

    </div>
  )
}