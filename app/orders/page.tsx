"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function OrdersPage(){

  const [orders,setOrders] = useState<any[]>([])
  const router = useRouter()

  useEffect(()=>{
    loadOrders()
  },[])

  async function loadOrders(){

    const tg:any = (window as any).Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if(!user) return

    const {data} = await supabase
      .from("orders")
      .select(`
        *,
        services(*)
      `)
      .eq("client_id",user.id)

    if(data) setOrders(data)

  }

  return(

    <div style={{padding:20}}>

      <h2>Мои заказы</h2>

      {orders.map(order=>(

        <div
          key={order.id}
          style={{
            border:"1px solid #ccc",
            padding:15,
            marginBottom:10
          }}
        >

          <h3>{order.services.title}</h3>

          <p>Цена: {order.price}</p>

          <p>Статус: {order.status}</p>

          <button
            onClick={()=>router.push(`/chat/${order.id}`)}
          >
            Открыть чат
          </button>

        </div>

      ))}

    </div>

  )

}