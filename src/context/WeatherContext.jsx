import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct";

  const processForecastData = useCallback((data) => {
    const dailyData = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temps: [],
          icons: [],
          descriptions: [],
          humidity: [],
          wind: [],
          dt: item.dt,
        };
      }

      dailyData[date].temps.push(item.main.temp);
      dailyData[date].icons.push(item.weather[0].icon);
      dailyData[date].descriptions.push(item.weather[0].description);
      dailyData[date].humidity.push(item.main.humidity);
      dailyData[date].wind.push(item.wind.speed);
      //storing data in states
    });

    return Object.values(dailyData)
      .sort((a, b) => a.dt - b.dt)
      .slice(0, 5);
  }, []);

  const fetchWeatherData = useCallback(
    async (searchCity) => {
      try {
        setLoading(true);
        setError("");
        setWeather(null);
        setForecast(null);
        const [weatherResponse, forecastResponse] = await Promise.all([
          axios.get(WEATHER_API_URL, {
            params: { q: searchCity, appid: API_KEY, units: "metric" },
          }),
          axios.get(FORECAST_API_URL, {
            params: { q: searchCity, appid: API_KEY, units: "metric" },
          }),
        ]); //fetch forecast and weather data simultaneously

        setWeather(weatherResponse.data);
        setForecast(processForecastData(forecastResponse.data));
        setHistory((prev) =>
          [
            searchCity,
            ...prev.filter((c) => c.toLowerCase() !== searchCity.toLowerCase()),
          ].slice(0, 5)
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch weather data. Please try again."
        );
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, processForecastData]
  );
  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  const refreshWeather = useCallback(() => {
    if (weather?.name) {
      fetchWeatherData(weather.name);
    }
  }, [weather, fetchWeatherData]);
  const debounce = useCallback((func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []); //debounce function for autocomplete. It will prevent unnecessary api calls when user is typing

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(GEOCODING_API_URL, {
          params: { q: query, limit: 5, appid: API_KEY },
        });

        setSuggestions(
          response.data.map((item) => ({
            name: item.name,
            country: item.country,
            state: item.state,
            lat: item.lat,
            lon: item.lon,
          }))
        );
      } catch (error) {
        console.error("Geocoding API Error:", error);
        setSuggestions([]);
      }
    }, 300),
    [API_KEY, debounce]
  );

  return (
    <WeatherContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        weather,
        forecast,
        loading,
        error,
        history,
        suggestions,
        isSuggestionsOpen,
        fetchWeather: fetchWeatherData,
        refreshWeather,
        fetchSuggestions,
        setIsSuggestionsOpen,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
