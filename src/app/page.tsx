'use client'

import { useEffect, useState } from "react";
import { type Data } from "./../types"
import Hero from "./components/Hero";
import CryptoTable from "./components/CryptoTable";

export default function Home() {
  const [data, setData] = useState<Data[]>([]);

  useEffect((() => {
    const axios = require('axios').default;

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/coinmarketcap');
        setData(response.data)
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    fetchData();
  }), []);

  return (
    <main className="flex flex-col items-center max-w-2xl sm:max-w-9/12 w-full h-full mx-auto p-2">
      {/* Hero Section with Aceternity Sparkles Component */}
      <Hero />

      {data.length > 0 && <CryptoTable data={data} />}
    </main>
  );
}
