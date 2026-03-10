"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Create(){

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [price,setPrice] = useState("")

async function createService(){

await supabase
.from("services")
.insert({
title,
description,
price
})

alert("Услуга создана!")

}

return(

<div style={{padding:"20px"}}>

<h1>Добавить услугу</h1>

<input
placeholder="Название"
onChange={(e)=>setTitle(e.target.value)}
/>

<br/><br/>

<input
placeholder="Описание"
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<input
placeholder="Цена"
onChange={(e)=>setPrice(e.target.value)}
/>

<br/><br/>

<button onClick={createService}>
Создать
</button>

</div>

)

}