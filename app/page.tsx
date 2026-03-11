"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function HomePage() {

  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {

    const { data } = await supabase
      .from("services")
      .select("*")

    if (!data) return

    const servicesWithRating = await Promise.all(

      data.map(async (service) => {

        const { data: reviews } = await supabase
          .from("reviews")
          .select("rating")
          .eq("service_id", service.id)

        let rating = 0
        let count = 0

        if (reviews && reviews.length > 0) {

          const sum = reviews.reduce((acc, r) => acc + r.rating, 0)

          rating = sum / reviews.length
          count = reviews.length

        }

        return {
          ...service,
          rating,
          reviewsCount: count
        }

      })

    )

    setServices(servicesWithRating)

  }

  async function rentService(serviceId: number) {

    const tg: any = (window as any).Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if (!user) {
      alert("Ошибка Telegram")
      return
    }

    const { data } = await supabase
      .from("orders")
      .insert({
        service_id: serviceId,
        client_id: user.id,
        status: "open"
      })
      .select()
      .single()

    if (!data) {
      alert("Ошибка создания заказа")
      return
    }

    window.location.href = `/chat/${data.id}`

  }

  return (

    <div style={{ padding: 20 }}>

      <h2>Специалисты</h2>

      {services.map((service) => (

        <div
          key={service.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginTop: 10,
            borderRadius: 10
          }}
        >

          <h3>{service.title}</h3>

          <p>{service.description}</p>

          <p>Цена: {service.price}</p>

          <p>
            ⭐ {service.rating.toFixed(1)} ({service.reviewsCount} отзывов)
          </p>

          <button
            onClick={() => rentService(service.id)}
            style={{
              padding: 10,
              marginTop: 10
            }}
          >
            Арендовать
          </button>

        </div>

      ))}

    </div>

  )

}