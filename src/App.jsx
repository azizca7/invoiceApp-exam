import React, { useState, useEffect } from "react";
import InvoicesList from "./pages/InvoicesList";
import Sidebar from "./components/Sidebar";
import InvoiceDetails from "./pages/InvoiceDetails";
import { Route, Routes } from "react-router-dom";
import useStore from "./store/useStore";
import ErrorPage from "./pages/ErrorPage";
import Loader from "./components/Loader";

function App() {
  const { isDarkMode } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#141625]" : "bg-white"}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <Routes>
            <Route path="/invoice/:id" element={<InvoiceDetails />} />
            <Route path="/" element={<InvoicesList />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
