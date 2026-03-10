"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {

const [services,setServices] = useState([])

useEffect(()=>{

loadServices()

},[])

async function loadServices(){

const { data } = await supabase
.from("services")
.select("*")

setServices(data as any || [])

}

return(

<div style={{padding:"20px"}}>

<h1>Специалисты</h1>
<a href="/create">
<button style={{
padding:"10px 15px",
marginBottom:"20px",
cursor:"pointer"
}}>
+ Добавить услугу
</button>
</a>
{services.map((service:any)=>(

<div key={service.id} style={{
border:"1px solid #ddd",
padding:"15px",
borderRadius:"10px",
marginBottom:"15px",
background:"#fafafa"
}}>

<h2>{service.title}</h2>

<p>{service.description}</p>

<p>{service.price} ⭐</p>
<button style={{
padding:"8px 12px",
cursor:"pointer"
}}>
Арендовать
</button>
</div>

))}

</div>

)

}