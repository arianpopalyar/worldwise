import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function CitiesProvider({children}){
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
    <CitiesContext.Provider value={{cities,isLoading}}>
        {children}

    </CitiesContext.Provider>
  )
}

function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw error('CitiesContext was used ouside the Cities Provider')
    return context;
}

export {CitiesProvider, useCities}