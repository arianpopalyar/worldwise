import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/product";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from './pages/AppLayout';
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <CitiesProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities"/>} />
          <Route
            path="cities"
            element={<CityList/>}
          />
          <Route
            path="countries"
            element={<CountryList/>}
          />
          <Route path="cities/:id" element={<City/>}/>
          
          <Route path="countries" element={<p>List of coutntries</p>} />
          <Route path="from" element={<p>From</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
