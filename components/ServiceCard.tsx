"use client"

type Props = {
  id: string
  title: string
  price: number
  image: string
  location: string
}

export default function ServiceCard({
  id,
  title,
  price,
  image,
  location
}: Props) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <img
        src={image}
        className="w-full h-48 object-cover"
      />

      <div className="p-3">

        <div className="font-semibold text-sm">
          {title}
        </div>

        <div className="text-gray-500 text-xs mt-1">
          {location}
        </div>

        <div className="flex justify-between items-center mt-3">

          <div className="font-bold text-blue-600">
            €{price}
          </div>

          <a
            href={`/service/${id}`}
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            View
          </a>

        </div>

      </div>
    </div>
  )
}