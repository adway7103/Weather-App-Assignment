import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiDayCloudy,
  WiNightClear,
  WiFog,
} from "react-icons/wi";
import { FaTemperatureHigh, FaTint, FaWind } from "react-icons/fa";

const getWeatherIcon = (iconCode) => {
  const icon = iconCode?.toString();
  switch (icon) {
    case "01d":
      return <WiDaySunny className="text-4xl text-yellow-400" />;
    case "01n":
      return <WiNightClear className="text-4xl text-blue-300" />;
    case "02d":
    case "03d":
      return <WiDayCloudy className="text-4xl text-gray-400" />;
    case "02n":
    case "03n":
      return <WiCloudy className="text-4xl text-gray-400" />;
    case "04d":
    case "04n":
      return <WiCloudy className="text-4xl text-gray-500" />;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return <WiRain className="text-4xl text-blue-400" />;
    case "11d":
    case "11n":
      return <WiThunderstorm className="text-4xl text-purple-500" />;
    case "13d":
    case "13n":
      return <WiSnow className="text-4xl text-blue-200" />;
    case "50d":
    case "50n":
      return <WiFog className="text-4xl text-gray-400" />;
    default:
      return <WiDaySunny className="text-4xl text-yellow-400" />;
  }
}; //assigning icons for different codes

const ForecastCard = ({ day }) => {
  const avgTemp = Math.round(
    day.temps.reduce((a, b) => a + b, 0) / day.temps.length
  );
  const avgHumidity = Math.round(
    day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length
  );
  const avgWind = (
    day.wind.reduce((a, b) => a + b, 0) / day.wind.length
  ).toFixed(1);
  const mainIcon = day.icons[Math.floor(day.icons.length / 2)];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center">
      <h3 className="font-semibold text-lg dark:text-white mb-2">
        {day.date.split(",")[0]}
      </h3>
      <div className="my-2">{getWeatherIcon(mainIcon)}</div>

      <p className="text-2xl font-bold dark:text-white mb-3">{avgTemp}°C</p>

      <div className="grid grid-cols-3 gap-2 w-full text-xs">
        <div className="flex flex-col items-center">
          <FaTemperatureHigh className="text-blue-500 mb-1" />
          <span className="dark:text-gray-300">
            {Math.round(Math.min(...day.temps))}°
          </span>
          <span className="dark:text-gray-300">
            {Math.round(Math.max(...day.temps))}°
          </span>
        </div>

        <div className="flex flex-col items-center">
          <FaTint className="text-blue-400 mb-1" />
          <span className="dark:text-gray-300">{avgHumidity}%</span>
        </div>

        <div className="flex flex-col items-center">
          <FaWind className="text-blue-600 mb-1" />
          <span className="dark:text-gray-300">{avgWind} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
