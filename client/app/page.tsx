"use client";

import React, { useEffect, useState } from "react";
import Marquee from "./components/marquee";
import PogsDisplay from "./components/myPogs";

function Page() {
  const [allPogs, setAllPogs] = useState([]); // Define allPogs state

  useEffect(() => {
    // Fetch allPogs data here
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/pogs/get");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAllPogs(data); // Update allPogs state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-gray-200">
      <Marquee />
      <div className="mt-20">
        {" "}
        {/* Add 20px margin top */}
        <PogsDisplay allPogs={allPogs} /> {/* Pass allPogs as prop */}
      </div>
    </div>
  );
}

export default Page;
