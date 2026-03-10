"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function HomePage(){

  const [services,setServices] = useState<any[]>([])
  const router = useRouter()

  useEffect(()=>{
    loadServices()
    saveUser()
  },[])

  async function saveUser(){

    const tg:any = window.Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if(!user) return

    await supabase
      .from("users")
      .upsert({
        id: user.id,
        username: user.username,
        first_name: user.first_name
      })

  }

  async function loadServices(){

    const {data} = await supabase
      .from("services")
      .select("*")

    if(data) setServices(data)

  }

  async function rent(service:any){

    const tg:any = window.Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if(!user){
      alert("Ошибка Telegram")
      return
    }

    const {data,error} = await supabase
      .from("orders")
      .insert([
        {
          service_id: service.id,
          client_id: user.id,
          price: service.price,
          status: "pending"
        }
      ])
      .select()
      .single()

    if(error){
      alert("Ошибка создания заказа")
      return
    }

    router.push(`/chat/${data.id}`)

  }

  return(

    <div style={{padding:20}}>

      <h2>Специалисты</h2>

      {services.map(service=>(

        <div
          key={service.id}
          style={{
            border:"1px solid #ccc",
            padding:15,
            marginBottom:10
          }}
        >

          <h3>{service.title}</h3>
          <p>{service.description}</p>

          <p>Цена: {service.price}</p>

          <button onClick={()=>rent(service)}>
            Арендовать
          </button>

        </div>

      ))}

    </div>

  )

}