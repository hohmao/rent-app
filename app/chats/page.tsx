"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ChatsPage(){

  const [orders,setOrders] = useState<any[]>([])
  const router = useRouter()

  const tg:any =
    typeof window !== "undefined"
      ? (window as any).Telegram?.WebApp
      : null

  const userId = tg?.initDataUnsafe?.user?.id

  useEffect(()=>{
    loadOrders()
  },[])

  async function loadOrders(){

    const {data} = await supabase
      .from("orders")
      .select("*")
      .or(`customer_id.eq.${userId},specialist_id.eq.${userId}`)
      .order("created_at",{ascending:false})

    if(data) setOrders(data)

  }

  function openChat(orderId:string){
    router.push("/chat/"+orderId)
  }

  return(

    <div style={{padding:20}}>

      <h1>Мои чаты</h1>

      {orders.map((o:any)=>(

        <div
          key={o.id}
          style={{
            border:"1px solid #ccc",
            padding:15,
            marginBottom:10,
            borderRadius:10
          }}
        >

          <div>
            <b>Заказ #{o.id}</b>
          </div>

          <div>
            Статус: {o.status}
          </div>

          <button
            onClick={()=>openChat(o.id)}
            style={{marginTop:10}}
          >
            Открыть чат
          </button>

        </div>

      ))}

    </div>

  )

}