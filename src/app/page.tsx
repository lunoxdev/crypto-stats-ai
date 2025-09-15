'use client'

import { useEffect, useState } from "react";
import { type Data } from "./../types"
import Hero from "./components/Hero";
import CryptoTable from "./components/CryptoTable";
import CryptoDetailModal from "./components/CryptoDetailModal";

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Data | null>(null);

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

  const handleRowClick = (crypto: Data) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  return (
    <main className="flex flex-col items-center max-w-2xl sm:max-w-9/12 w-full h-full mx-auto px-2 pb-2">
      {/* Hero Section with Aceternity Sparkles Component */}
      <Hero />

      {/* Table with CoinMarketCap crypto list */}
      {data.length > 0 && <CryptoTable data={data} onRowClick={handleRowClick} />}

      {/* Modal to display the time apexcharts graph and comparation options */}
      <CryptoDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        crypto={selectedCrypto}
        allCryptos={data}
      />
    </main>
  );
}
