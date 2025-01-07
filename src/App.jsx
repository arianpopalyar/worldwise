import {lazy, Suspense} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 
// import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from './pages/AppLayout';


const Product=  lazy(()=> import("./pages/product"));
const Login = lazy(()=> import("./pages/Login"));
const HomePage = lazy (()=> import("./pages/HomePage"));
const Pricing = lazy (()=> import("./pages/Pricing"));
const PageNotFound = lazy (()=> import("./pages/PageNotFound"));
const AppLayout = lazy (()=> import('./pages/AppLayout'));

import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";


function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
      <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}></Suspense>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City/>}/>
            <Route path="countries" element={<CountryList/>}/>
            <Route path="form" element={<Form />} />
            
            {/* <Route path="from" element={<p>From</p>} /> */}
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;