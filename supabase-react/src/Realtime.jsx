import { useEffect, useState } from "react";
import { RealtimeClient } from "@supabase/realtime-js";

const realtimeUrl = "ws://localhost:4000/socket";

export default () => {
  const [log, setLog] = useState(null);

  useEffect(() => {
    const client = new RealtimeClient(realtimeUrl);

    client.onOpen(() => {
      console.log("conected");
    });

    client.connect();

    const databaseWatcher = client.channel("realtime:*");
    databaseWatcher.on("*", (e) => {
      setLog(e);
      console.log(e);
    });
    databaseWatcher.subscribe();

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <>
      <div>{JSON.stringify(log)}</div>
    </>
  );
};
