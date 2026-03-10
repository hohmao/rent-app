"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setServices(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Специалисты</h1>

      <button style={{ marginBottom: 20 }}>+ Добавить услугу</button>

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