import React, { useMemo } from "react";
import { useFetchAllData } from "../hooks/useFirebase";

export const DataList: React.FC = () => {
  const { data } = useFetchAllData();
  const dataList = useMemo(
    () => Object.entries(data || {}).map(([key, value]) => ({ key, value })),
    [data]
  );

  return (
    <dl>
      {dataList.map(({ key, value }) => (
        <div key={`${key}${value}`}>
          key: {key}, value: {value}
        </div>
      ))}
    </dl>
  );
};
