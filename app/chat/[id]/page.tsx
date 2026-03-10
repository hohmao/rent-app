"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Chat({ params }: any) {

  const orderId = params.id

  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState("")
  const [user, setUser] = useState<any>(null)



  useEffect(() => {

    const tg = (window as any).Telegram?.WebApp

    if(tg?.initDataUnsafe?.user){
      setUser(tg.initDataUnsafe.user)
    }

    loadMessages()

    subscribeRealtime()

  },[])



  async function loadMessages(){

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("order_id",orderId)
      .order("created_at",{ascending:true})

    if(data){
      setMessages(data)
    }

  }



  function subscribeRealtime(){

    supabase
      .channel("chat-"+orderId)
      .on(
        "postgres_changes",
        {
          event:"INSERT",
          schema:"public",
          table:"messages",
          filter:`order_id=eq.${orderId}`
        },
        (payload:any)=>{

          setMessages((prev)=>[...prev,payload.new])

        }
      )
      .subscribe()

  }



  async function sendMessage(){

    if(!text) return

    await supabase
      .from("messages")
      .insert([{
        order_id: orderId,
        sender_id: user?.id,
        text
      }])

    setText("")

  }



  return(

    <div style={{padding:20}}>

      <h2>Чат заказа</h2>



      <div style={{
        border:"1px solid #ddd",
        padding:10,
        height:400,
        overflowY:"scroll",
        marginBottom:10
      }}>

        {messages.map((m)=>(

          <div
            key={m.id}
            style={{
              marginBottom:10,
              textAlign: m.sender_id === user?.id ? "right" : "left"
            }}
          >

            <span
              style={{
                background: m.sender_id === user?.id ? "#2AABEE" : "#eee",
                color: m.sender_id === user?.id ? "white" : "black",
                padding:"6px 10px",
                borderRadius:10,
                display:"inline-block"
              }}
            >
              {m.text}
            </span>

          </div>

        ))}

      </div>



      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Сообщение..."
        style={{width:"70%",padding:8}}
      />



      <button
        onClick={sendMessage}
        style={{marginLeft:10,padding:8}}
      >
        Отправить
      </button>



    </div>

  )

}