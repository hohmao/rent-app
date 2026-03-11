"use client"

import { useEffect } from "react"
import Image from "next/image"
import { initTelegram } from "./telegram"

export default function Home() {

  useEffect(() => {
    initTelegram()
  }, [])

  const properties = [
    {
      id: 1,
      title: "Luxury Villa Madrid",
      city: "Madrid",
      price: 120,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
      id: 2,
      title: "Beach House Barcelona",
      city: "Barcelona",
      price: 200,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    }
  ]

  return (
    <div className="space-y-6">

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 border rounded-full text-sm">All</button>
        <button className="px-4 py-2 border rounded-full text-sm">Apartments</button>
        <button className="px-4 py-2 border rounded-full text-sm">Villas</button>
        <button className="px-4 py-2 border rounded-full text-sm">Beach</button>
        <button className="px-4 py-2 border rounded-full text-sm">Luxury</button>
      </div>

      <div className="space-y-4">
        {properties.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <div className="relative w-full h-48">

              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />

            </div>

            <div className="p-4">

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.city}
              </p>

              <div className="flex justify-between items-center mt-3">

                <span className="text-blue-600 font-semibold">
                  €{item.price}
                </span>

                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm">
                  View
                </button>

              </div>

            </div>

          </div>

        ))}
      </div>

    </div>
  )
}