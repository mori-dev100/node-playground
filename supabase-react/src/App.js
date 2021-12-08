import Auth from "./Auth";
import Account from "./Account";
import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <Account session={session} key={session.user.id} />
      )}
    </div>
  );
}

export default App;
