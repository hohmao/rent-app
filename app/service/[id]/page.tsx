"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ServicePage() {

  const params = useParams()
  const serviceId = params.id

  const [service, setService] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    loadService()
    loadReviews()
  }, [])

  async function loadService() {

    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single()

    setService(data)

  }

  async function loadReviews() {

    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("service_id", serviceId)

    if (data) setReviews(data)

  }

  async function rentService() {

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

  if (!service) return <div>Загрузка...</div>

  const rating =
    reviews.length > 0
      ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
      : 0

  return (

    <div style={{ padding: 20 }}>

      <h2>{service.title}</h2>

      <p>{service.description}</p>

      <p>Цена: {service.price}</p>

      <p>
        ⭐ {rating.toFixed(1)} ({reviews.length} отзывов)
      </p>

      <button
        onClick={rentService}
        style={{
          padding: 10,
          marginTop: 10
        }}
      >
        Арендовать
      </button>

      <h3 style={{ marginTop: 30 }}>Отзывы</h3>

      {reviews.length === 0 && <p>Пока нет отзывов</p>}

      {reviews.map((r) => (

        <div
          key={r.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginTop: 10,
            borderRadius: 10
          }}
        >

          <p>⭐ {r.rating}</p>

          <p>{r.comment}</p>

        </div>

      ))}

    </div>

  )

}
