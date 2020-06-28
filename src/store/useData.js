import { useState, useEffect } from "react";
import { json } from "d3";

const Url = "data.json";
export default function useData() {
  const [data, setData] = useState(null);
  useEffect(() => {
    json(Url).then((data) => {
      setData(data.filter((d) => d["Sector"] !== "Partidas Informativas"));
    });
  }, []);

  return data;
}
