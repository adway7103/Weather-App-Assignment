import { useContext } from "react";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import SearchHistory from "../components/SearchHistory";
import { FaSearch, FaSpinner, FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context/WeatherContext";
import { TemperatureChart } from "../components/TemperatureChart";
const WeatherDashboard = () => {
  const {
    searchQuery,
    setSearchQuery,
    weather,
    forecast,
    loading,
    error,
    history,
    refreshWeather,
    suggestions,
    isSuggestionsOpen,
    fetchWeather,
    fetchSuggestions,
    setIsSuggestionsOpen,
  } = useContext(WeatherContext);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery.trim());
      setSearchQuery("");
    }
  };
  const AutocompleteDropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => {
            setSearchQuery(suggestion.name);
            fetchWeather(suggestion.name);
            setIsSuggestionsOpen(false);
          }}
          className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
        >
          <span className="font-medium dark:text-white truncate">
            {suggestion.name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
            {suggestion.state ? `${suggestion.state}, ` : ""}
            {suggestion.country}
          </span>
        </button>
      ))}
      {suggestions.length === 0 && searchQuery && (
        <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
          No matching cities found
        </div>
      )}
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br  transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    fetchSuggestions(e.target.value);
                    setIsSuggestionsOpen(true);
                  }}
                  placeholder="Enter a city name..."
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  disabled={loading}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSuggestionsOpen(false), 200)
                  }
                />
                {isSuggestionsOpen && <AutocompleteDropdown />}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading || !searchQuery.trim()}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    loading || !searchQuery.trim()
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      Get Weather
                    </>
                  )}
                </button>
              </div>
            </div>
            {history.length > 0 && (
              <SearchHistory
                history={history}
                onSearch={(city) => {
                  setSearchQuery(city);
                  fetchWeather(city);
                }}
              />
            )}
          </form>
        </div>
        {error && (
          <div className="mb-8 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/50 dark:border-red-700 dark:text-red-100 rounded-r-lg shadow-md transition-all duration-300">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium">Weather Error</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="mb-8 text-center py-12 space-y-4">
            <div className="inline-flex items-center justify-center relative">
              <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-gray-700"></div>
              <FaSpinner className="absolute text-blue-500 dark:text-blue-400 text-4xl animate-spin" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              Fetching Weather Data
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Please wait while we get the latest weather information...
            </p>
          </div>
        )}
        {weather && !loading && (
          <>
            <div className="mb-8">
              <WeatherCard weather={weather} onRefresh={refreshWeather} />
            </div>

            {forecast && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                  5-Day Forecast
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {forecast.map((day, index) => (
                    <ForecastCard key={index} day={day} />
                  ))}
                </div>
              </div>
            )}
            {forecast && <TemperatureChart forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
