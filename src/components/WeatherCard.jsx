import {
  FaSync,
  FaThermometerHalf,
  FaTint,
  FaWind,
  FaCompass,
} from "react-icons/fa";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const WeatherCard = ({ weather, onRefresh }) => {
  // Weather icon mapping
  const getWeatherIcon = () => {
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clear":
        return <WiDaySunny className="text-5xl text-yellow-400" />;
      case "rain":
        return <WiRain className="text-5xl text-blue-400" />;
      case "clouds":
        return <WiCloudy className="text-5xl text-gray-400" />;
      case "snow":
        return <WiSnow className="text-5xl text-blue-200" />;
      case "thunderstorm":
        return <WiThunderstorm className="text-5xl text-purple-500" />;
      default:
        return <WiDaySunny className="text-5xl text-yellow-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-blue-100 dark:text-blue-200">
              {new Date(weather.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={onRefresh}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
            aria-label="Refresh weather"
          >
            {/* refresh button */}
            <FaSync className="text-white" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            {getWeatherIcon()}
            <div className="ml-4">
              <p className="text-xl capitalize">
                {weather.weather[0].description}
              </p>
              <p className="text-4xl font-bold">
                {Math.round(weather.main.temp)}°C
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">
              Feels like {Math.round(weather.main.feels_like)}°C
            </p>
            <p>Humidity {weather.main.humidity}%</p>
          </div>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {/* Temperature */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 flex items-center">
          <FaThermometerHalf className="text-blue-500 dark:text-blue-400 text-2xl mr-3" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Temperature
            </p>
            <p className="text-xl font-semibold dark:text-white">
              {Math.round(weather.main.temp)}°C
            </p>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 flex items-center">
          <FaTint className="text-blue-500 dark:text-blue-400 text-2xl mr-3" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Humidity</p>
            <p className="text-xl font-semibold dark:text-white">
              {weather.main.humidity}%
            </p>
          </div>
        </div>

        {/* Wind */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 flex items-center">
          <FaWind className="text-blue-500 dark:text-blue-400 text-2xl mr-3" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Wind</p>
            <p className="text-xl font-semibold dark:text-white">
              {weather.wind.speed} km/h
            </p>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 flex items-center">
          <FaCompass className="text-blue-500 dark:text-blue-400 text-2xl mr-3" />
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Pressure</p>
            <p className="text-xl font-semibold dark:text-white">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Min/Max Temp
          </p>
          <p className="text-lg font-semibold dark:text-white">
            {Math.round(weather.main.temp_min)}° /{" "}
            {Math.round(weather.main.temp_max)}°
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Visibility</p>
          <p className="text-lg font-semibold dark:text-white">
            {(weather.visibility / 1000).toFixed(1)} km
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
