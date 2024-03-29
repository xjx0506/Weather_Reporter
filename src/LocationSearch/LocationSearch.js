import { useState } from "react"
import { apiKey } from "../constants";
import styles from './styles.module.css';
export const LocationSearch = ({onCityFound}) =>{

    const [zipCode, setZipCode] = useState('');
    const getLocation = (zip) =>{
        const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zip}&language=en-us`
        fetch(url)
         .then(res => res.json())
         .then(res => res.find(locationElement => locationElement.Country.ID === 'CA'))
         .then(res => {
            onCityFound({
                name: res.LocalizedName,
                key: res.Key,
                state: res.AdministrativeArea.ID,
            });
            //clear the search field after searching
            setZipCode('');
         });
    }
    return(
        <div className={styles.main}>
            <input placeholder="Input zipcode" value={zipCode}
                 onChange={(e)=>{setZipCode(e.target.value)}} type="text"/>
            <button onClick={() =>getLocation(zipCode)}>Search</button>
        </div>
    )
}