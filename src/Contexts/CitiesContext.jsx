import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();
// const initialState = {
//     cities: [],
//     isLoading: false,
//     currentCity: {},
//     error: "",
//   };
function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentCity, setCurrentCity]= useState({});
    
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

  async function getCity(id) {
    try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch {
        alert("there was an error..");
      } finally {
        setLoading(false);
      }
    
  }

  return (
    <CitiesContext.Provider 
    value={{
        cities,
        isLoading,
        currentCity,
        getCity
    }}>
        {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
    const context = useContext(CitiesContext);
    if(context === undefined) 
        throw Error('CitiesContext was used outside the Cities Provider')
    return context;
}

export {CitiesProvider, useCities}