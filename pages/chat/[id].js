import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tontbolszlmgwlslinma.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvbnRib2xzemxtZ3dsc2xpbm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMTY4MTAsImV4cCI6MjA4ODY5MjgxMH0.H0bugub9mLDLJ9X1y7rfeXTF4LkF2h2XXuufKM__L6o"
);

export default function ChatPage() {

  const router = useRouter();
  const { id } = router.query;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const userId = "user_" + Math.floor(Math.random() * 1000000);

  // загрузка сообщений
  async function loadMessages() {

    if (!id) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("order_id", id)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(data);
    }
  }

  // отправка сообщения
  async function sendMessage() {

    if (!text) return;

    await supabase
      .from("messages")
      .insert([
        {
          order_id: id,
          sender_id: userId,
          message: text
        }
      ]);

    setText("");
    loadMessages();
  }

  useEffect(() => {

    loadMessages();

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        payload => {

          if (payload.new.order_id === id) {
            setMessages(prev => [...prev, payload.new]);
          }

        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [id]);

  return (
    <div style={{padding:20}}>

      <h2>Чат заказа #{id}</h2>

      <div style={{
        border:"1px solid #ccc",
        height:400,
        overflow:"auto",
        padding:10,
        marginBottom:10
      }}>

        {messages.map(m => (
          <div key={m.id} style={{marginBottom:8}}>
            <b>{m.sender_id}</b>: {m.message}
          </div>
        ))}

      </div>

      <div style={{display:"flex", gap:10}}>

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
  );
}