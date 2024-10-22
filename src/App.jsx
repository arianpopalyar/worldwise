import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/product";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error..");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<PageNotFound />}>
          <Route
            path="cities"
            element={<CityList cities={cities} isloading={isLoading} />}
          />
          <Route index element={<CityList />} />
          <Route path="countreis" element={<p>List of coutntries</p>} />
          <Route path="from" element={<p>From</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
