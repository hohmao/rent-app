"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

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

    setShowModal(false);

    loadServices();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Специалисты</h1>

      <button
        onClick={() => setShowModal(true)}
        style={{ marginBottom: 20 }}
      >
        + Добавить услугу
      </button>

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

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 10,
              width: 300,
            }}
          >
            <h3>Добавить услугу</h3>

            <input
              placeholder="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />

            <textarea
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />

            <input
              placeholder="Цена"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />

            <button onClick={addService}>Добавить</button>

            <button
              onClick={() => setShowModal(false)}
              style={{ marginLeft: 10 }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}