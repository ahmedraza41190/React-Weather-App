import "./weatherWidget.css";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="card">
      <h3> {weatherData?.name} {weatherData?.sys?.country}</h3>

      {/* <h3>Country: {weatherData?.sys?.country}</h3> */}

      <h2 className="temp">{weatherData?.main?.temp}°C</h2>

      <div>Humidity: {weatherData?.main?.humidity}%</div>

      <div>Wind Speed: {weatherData?.wind?.speed}km/h</div>

      <div className="flex">Weather:
        <img src="https://openweathermap.org/img/wn/04n.png" alt="" class="icon" />
        {weatherData?.weather[0]?.description}
      </div>
    </div>
  );
};

export default WeatherCard;