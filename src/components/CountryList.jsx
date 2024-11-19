import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading }= useCities();
  if (isLoading) return <Spinner />;
  
  
  if (!cities.length) return <Message message="add you first city" />;

  const countries =cities.reduce((arr, city) => {
    if(!arr.map((el)=> el.city).includes(city.country))
        return[...arr,{country:city.country,emoji:city.emoji}];
    else return arr;
  },[]);

  return (
    <ul className={styles.countryList}>
      {  
      countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
