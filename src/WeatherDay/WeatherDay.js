export const WeatherDay = ({min, max, weatherType, weatherKey, dayOfWeek}) =>{

    return(
        <>
            {dayOfWeek}
            <img src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`} alt={weatherType} />
            <div>Min: {min} Max: {max}</div>
        </>
    );
}