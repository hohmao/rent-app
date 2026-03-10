"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: false });

    if (data) setServices(data);
  }

  async function addService() {
    if (!title || !description || !price) return;

    await supabase.from("services").insert([
      {
        title,
        description,
        price: Number(price),
      },
    ]);

    setTitle("");
    setDescription("");
    setPrice("");

    loadServices();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Специалисты</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <h3>Добавить услугу</h3>

        <input
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <input
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />

        <button onClick={addService}>Добавить</button>
      </div>

      {services.map((service) => (
        <div
          key={service.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
          }}
        >
          <h3>{service.title}</h3>

          <p>{service.description}</p>

          <b>{service.price} ⭐</b>

          <div style={{ marginTop: 10 }}>
            <button>Арендовать</button>
          </div>
        </div>
      ))}
    </div>
  );
}