import { useEffect, useState} from "react";
import { WeatherDay } from "../WeatherDay/WeatherDay";
import { apiKey } from "../constants";
import styles from './styles.module.css'
import { LocationSearch } from "../LocationSearch/LocationSearch";

export const App = () => {
  // const locationKey = '53759_PC';
  console.log(apiKey);
  const [weatherInfo, setWeatherInfo] = useState()
  const [locationKey, setLocationKey] = useState('');
  const [location, setLocation] = useState('');

  // return weekday[this.getDay()];
  const padNum = (num) =>{
      const strNum = num + '';
      const strLen = strNum.length;
      if(strLen < 2){
        return '0' + strNum;
      }
      return strNum;

  }

  useEffect(() => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if(locationKey){
      // we fetch the api here
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}&language=en-us`)
          .then(res => res.json())
          .then(res => {
            console.log(weekday[new Date(res.DailyForecasts[0].Date).getDay()])
            setWeatherInfo(res.DailyForecasts.map(df => {
              return{
                min: df.Temperature.Minimum.Value,
                max: df.Temperature.Maximum.Value,
                weatherType: df.Day.IconPhrase,
                weatherKey: padNum(df.Day.Icon),
                dayOfWeek: weekday[new Date(df.Date).getDay()],
              }
            }))}
          )
    }
  }, [locationKey]);

  useEffect(()=>{
    console.log(weatherInfo)
  }, [weatherInfo])

  return (
    <div>
      <LocationSearch 
        onCityFound = {cityFound => {
          setLocationKey(cityFound.key);
          setLocation(cityFound.name + ', ' + cityFound.state)
      }}/>
      <h1 className={styles.header}>{location}</h1>
      <div className={styles.main}>
        {!!weatherInfo && weatherInfo.map((i, index) => (
          <div className={styles.day} key = {index}>
            <WeatherDay min={i.min} max={i.max} weatherType={i.weatherType} weatherKey = {i.weatherKey} dayOfWeek = {i.dayOfWeek}/>
          </div>
          ))}
      </div>
    </div>
    
  )
}

// export default App;
