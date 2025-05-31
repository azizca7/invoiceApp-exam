import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import InvoiceCard from "../components/InvoiceCard";
function Home() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <div>
      <Header />
      <InvoiceCard />
    </div>
  );
}

export default Home;
