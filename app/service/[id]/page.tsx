"use client"

import ServiceCard from "@/components/ServiceCard"

export default function HomePage() {

  const services = [
    {
      id: "1",
      title: "Luxury Villa Madrid",
      price: 120,
      location: "Madrid",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
    },
    {
      id: "2",
      title: "Beach House Barcelona",
      price: 200,
      location: "Barcelona",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    {
      id: "3",
      title: "Apartment Valencia",
      price: 90,
      location: "Valencia",
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
    }
  ]

  return (
    <div className="space-y-4">

      {services.map(service => (

        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          price={service.price}
          location={service.location}
          image={service.image}
        />

      ))}

    </div>
  )
}