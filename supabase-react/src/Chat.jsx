import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Chat() {
  const [name, setName] = useState(null);

  useEffect(async () => {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    setName(data.username);
  }, []);

  useEffect(() => {
    const messageListener = supabase
      .from("profiles")
      .on("INSERT", (payload) => {
        console.log(`insert`, { payload });
      })
      .on("DELETE", (payload) => {
        console.log(`delete`, { payload });
      })
      .on("UPDATE", (payload) => {
        console.log("update", { payload });
        const name = payload.new.username;
        setName(name);
      })
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, []);

  return (
    <>
      <div>
        <span>sync name: {name}</span>
      </div>
    </>
  );
}
