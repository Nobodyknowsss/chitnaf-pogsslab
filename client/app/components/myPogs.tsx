"use client";

import React, { useState, useEffect } from "react";

interface Pog {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
}

interface PogsDisplayInterface {
  allPogs: Pog[];
}

function PogsDisplay(PogsDisplayProps: PogsDisplayInterface) {
  const { allPogs } = PogsDisplayProps;
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {allPogs.map((pog: Pog) => {
        return (
          <div
            key={pog.id}
            className="max-w-sm overflow-hidden shadow-lg m-4 items-center justify-center rounded-md "
            style={{ minWidth: "300px" }}
          >
            <div className="px-6 py-4">
              <div className="text-blue-400 font-bold text-xl mb-2 italic">
                {pog.name}
              </div>
              <p className="text-yellow-700 text-lg mb-2 font-extrabold">
                {pog.ticker_symbol}
              </p>
              <p className="text-gray-700 text-base font-medium">
                Price: ${pog.price.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-end h-16">
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-3 ml-20">
                Buy
              </button>
              <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-3 mr-20">
                Sell
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PogsDisplay;
