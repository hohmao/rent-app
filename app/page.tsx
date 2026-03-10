"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home(){

const [services,setServices] = useState<any[]>([])
const [showModal,setShowModal] = useState(false)

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [price,setPrice] = useState("")
const [category,setCategory] = useState("")

const [userId,setUserId] = useState<number>(0)



useEffect(()=>{

loadServices()

const tg = (window as any).Telegram?.WebApp

if(tg?.initDataUnsafe?.user){
setUserId(tg.initDataUnsafe.user.id)
}else{
setUserId(999999) // dev режим
}

},[])



async function loadServices(){

const { data,error } = await supabase
.from("services")
.select("*")
.order("id",{ascending:false})

if(error){
console.log(error)
return
}

if(data){
setServices(data)
}

}



async function addService(){

if(!title || !description || !price) return

const { error } = await supabase
.from("services")
.insert([{

telegram_id:userId,
title:title,
description:description,
price:Number(price),
category:category,
rating:5

}])

if(error){
console.log(error)
alert("Ошибка добавления услуги")
return
}

setTitle("")
setDescription("")
setPrice("")
setCategory("")

setShowModal(false)

loadServices()

}



async function createOrder(service:any){

const priceValue = Number(service.price)

const { data,error } = await supabase
.from("orders")
.insert([{

client_id:userId,
specialist_id:service.telegram_id,
service_id:service.id,
price:priceValue,
status:"pending"

}])
.select()
.single()

if(error){
console.log("ORDER ERROR:",error)
alert("Ошибка создания заказа")
return
}

if(data){
window.location.href="/chat/"+data.id
}

}



return(

<div style={{padding:20}}>

<h1>Специалисты</h1>

<button
onClick={()=>setShowModal(true)}
style={{marginBottom:20}}
>
+ Добавить услугу
</button>



{services.map(service=>(

<div
key={service.id}
style={{
border:"1px solid #ddd",
borderRadius:10,
padding:15,
marginBottom:15
}}
>

<h3>{service.title}</h3>

<p>{service.description}</p>

<p>Категория: {service.category}</p>

<p>⭐ {service.rating}</p>

<b>{service.price} ⭐</b>

<div style={{marginTop:10}}>

<button onClick={()=>createOrder(service)}>
Арендовать
</button>

</div>

</div>

))}



{showModal && (

<div
style={{
position:"fixed",
inset:0,
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<div
style={{
background:"white",
padding:20,
borderRadius:10,
width:300
}}
>

<h3>Новая услуга</h3>

<input
placeholder="Название"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<br/>

<textarea
placeholder="Описание"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<br/>

<input
placeholder="Категория"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<br/>

<input
placeholder="Цена"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<br/>

<button onClick={addService}>
Добавить
</button>

<button
onClick={()=>setShowModal(false)}
style={{marginLeft:10}}
>
Отмена
</button>

</div>

</div>

)}

</div>

)

}