import Home from "./pages/Home";
import Details from "./pages/Details";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:id",
        element: <Details />,
        
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? <Loader /> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
