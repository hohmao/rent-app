"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ReviewPage() {

  const params = useParams()
  const router = useRouter()

  const orderId = params.id

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  async function sendReview() {

    const tg: any = (window as any).Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if (!user) {
      alert("Ошибка Telegram")
      return
    }

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()

    if (!order) {
      alert("Заказ не найден")
      return
    }

    await supabase
      .from("reviews")
      .insert({
        order_id: orderId,
        reviewer_id: user.id,
        service_id: order.service_id,
        rating: rating,
        comment: comment
      })

    alert("Спасибо за отзыв!")

    router.push("/")
  }

  return (

    <div style={{ padding: 20 }}>

      <h2>Оставить отзыв</h2>

      <div>
        <label>Оценка</label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >

          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>

        </select>

      </div>

      <div style={{ marginTop: 15 }}>

        <textarea
          placeholder="Комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            height: 100
          }}
        />

      </div>

      <button
        onClick={sendReview}
        style={{
          marginTop: 15,
          padding: 10,
          width: "100%"
        }}
      >
        Отправить отзыв
      </button>

    </div>

  )

}