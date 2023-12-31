import { useState, useRef, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../weatherWidget/weatherWidget";
import "./home.css"

const Home = () => {
  // not recommended
  // const [cityName, setCityName] = useState("");

  

  const [weatherData, setWeatherData] = useState([]);
  const cityNameRef = useRef(null);

  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 

  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        console.log("location: ", location);

        try {
          let API_KEY = "e0f99c494c2ce394a18cc2fd3f100543";
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric`,
            {
              signal: controller.signal,
            }
          );
          console.log(response.data);

          setCurrentLocationWeather(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.data);
          setIsLoading(false);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      // cleanup function
      controller.abort();
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("cityName: ", cityNameRef.current.value);

    let API_KEY = "e0f99c494c2ce394a18cc2fd3f100543";
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${API_KEY}&units=metric`
      );

      console.log(response.data);
      setWeatherData([response.data, ...weatherData]);
      setIsLoading(false);
    } catch (error) {
      // handle error
      console.log(error?.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="main">
      <form onSubmit={submitHandler} className="inputCard">
        <label htmlFor="cityNameInput"></label>
        <input
          id="cityNameInput"
          placeholder="Search Weather"
          type="text"
          required
          minLength={2}
          maxLength={20}
          //   onChange={(e) => setCityName(e.target.value)}
          ref={cityNameRef}
        />
        <br />
        <button type="submit"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em"
          width="1.5em" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
          </path>
        </svg></button>
      </form>

      <hr />

      <div className="result">

        {isLoading ?  <div>Loading...</div> : null}

        {weatherData.length || currentLocationWeather || isLoading ? null : <div>No data found</div>}

        {weatherData.map((eachWeatherData, index) => {
          return <WeatherCard key={index} weatherData={eachWeatherData} />;
        })}

        {currentLocationWeather ? <WeatherCard weatherData={currentLocationWeather} /> : null}

      </div>


    </div>
  );
};

export default Home;