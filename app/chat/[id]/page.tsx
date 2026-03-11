"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ChatPage(){

  const params = useParams()
  const orderId = params.id as string

  const [messages,setMessages] = useState<any[]>([])
  const [text,setText] = useState("")

  const tg:any =
    typeof window !== "undefined"
      ? (window as any).Telegram?.WebApp
      : null

  const userId = tg?.initDataUnsafe?.user?.id

  useEffect(()=>{

    loadMessages()

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        {
          event:"INSERT",
          schema:"public",
          table:"messages"
        },
        (payload:any)=>{
          if(payload.new.order_id === orderId){
            setMessages(prev=>[...prev,payload.new])
          }
        }
      )
      .subscribe()

    return ()=>{
      supabase.removeChannel(channel)
    }

  },[orderId])

  async function loadMessages(){

    const {data} = await supabase
      .from("messages")
      .select("*")
      .eq("order_id",orderId)
      .order("created_at",{ascending:true})

    if(data) setMessages(data)

  }

  async function sendMessage(){

    if(!text) return

    await supabase
      .from("messages")
      .insert([
        {
          order_id: orderId,
          sender_id: userId,
          message: text
        }
      ])

    setText("")

  }

  async function acceptOrder(){

    await supabase
      .from("orders")
      .update({
        status:"active"
      })
      .eq("id",orderId)

  }

  async function completeOrder(){

    await supabase
      .from("orders")
      .update({
        status:"completed"
      })
      .eq("id",orderId)

  }

  return(

    <div style={{padding:20}}>

      <h2>Чат заказа #{orderId}</h2>

      <div
        style={{
          border:"1px solid #ccc",
          height:400,
          overflow:"auto",
          padding:10,
          marginBottom:20
        }}
      >

        {messages.map((m:any)=>(
          <div key={m.id}>
            <b>{m.sender_id}</b>: {m.message}
          </div>
        ))}

      </div>

      <div style={{marginBottom:20}}>

        <button
          onClick={acceptOrder}
          style={{marginRight:10}}
        >
          Принять заказ
        </button>

        <button
          onClick={completeOrder}
        >
          Завершить заказ
        </button>

      </div>

      <div style={{display:"flex",gap:10}}>

        <input
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder="Сообщение..."
          style={{flex:1}}
        />

        <button onClick={sendMessage}>
          Отправить
        </button>

      </div>

    </div>

  )

}