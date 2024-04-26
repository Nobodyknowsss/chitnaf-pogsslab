"use client";

import React, { useEffect, useState } from "react";

function Marquee() {
  const [tickerSymbols, setTickerSymbols] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/pogs/get");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const symbols = data.map((pog: any) => pog.ticker_symbol);
        setTickerSymbols(symbols);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5">
      {tickerSymbols.length > 0 && (
        <marquee className="font-bold p-2 bg-black w-full">
          {tickerSymbols.map((symbol, index) => (
            <span
              key={index}
              className="inline-block py-1 px-3 mx-1 bg-white text-yellow-700 rounded-lg shadow-md"
              style={{ border: "2px solid red" }}
            >
              {symbol}
            </span>
          ))}
        </marquee>
      )}
    </div>
  );
}

export default Marquee;
