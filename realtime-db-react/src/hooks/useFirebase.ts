import {
  getDatabase,
  DatabaseReference,
  onValue,
  ref,
} from "firebase/database";
import { app } from "../service/firebase";
import { useEffect, useMemo, useState } from "react";

export const useFirebase = () => {
  return useMemo(() => {
    const database = getDatabase(app);
    return ref(database, "/sample");
  }, []);
};

const useFetchData = (ref: DatabaseReference) => {
  const [data, setData] = useState<{ [key: string]: string }>();

  useEffect(() => {
    onValue(ref, (snapshot) => {
      if (snapshot?.val()) {
        setData(snapshot.val());
      }
    });
  }, []);

  return { data };
};

export const useFetchAllData = () => {
  const ref = useFirebase();
  return useFetchData(ref);
};
