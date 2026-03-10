"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Chat({ params }: any){

const orderId = params.id

const [messages,setMessages] = useState<any[]>([])
const [text,setText] = useState("")

const tg = (window as any).Telegram?.WebApp
const user = tg?.initDataUnsafe?.user



useEffect(()=>{

loadMessages()

const interval = setInterval(loadMessages,2000)

return ()=>clearInterval(interval)

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



async function sendMessage(){

if(!text) return

await supabase
.from("messages")
.insert([{

order_id: orderId,
sender_id: user?.id || 0,
text: text

}])

setText("")

loadMessages()

}



return(

<div style={{padding:20}}>

<h2>Чат заказа #{orderId}</h2>

<div
style={{
border:"1px solid #ddd",
height:400,
overflow:"auto",
padding:10,
marginBottom:10
}}
>

{messages.map((m)=>{

const isMine = m.sender_id === user?.id

return(

<div
key={m.id}
style={{
textAlign: isMine ? "right":"left",
marginBottom:10
}}
>

<span
style={{
background:isMine ? "#0088ff":"#eee",
color:isMine ? "white":"black",
padding:8,
borderRadius:10,
display:"inline-block"
}}
>

{m.text}

</span>

</div>

)

})}

</div>

<div style={{display:"flex",gap:10}}>

<input
value={text}
onChange={(e)=>setText(e.target.value)}
style={{flex:1}}
placeholder="Сообщение..."
/>

<button onClick={sendMessage}>
Отправить
</button>

</div>

</div>

)

}