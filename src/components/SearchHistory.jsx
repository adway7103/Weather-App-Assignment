import { FaHistory } from "react-icons/fa";

const SearchHistory = ({ history, onSearch }) => {
  return (
    <div className="p-6 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
      <div className="flex items-center mb-4">
        <FaHistory className="text-xl text-gray-600 dark:text-gray-300 mr-2" />
        <h3 className="text-lg font-semibold dark:text-white">
          Recent Searches
        </h3>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No recent searches yet
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {history.map((city, index) => (
            <button
              key={index}
              onClick={() => onSearch(city)}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 
                         rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors
                         flex items-center group"
            >
              <span>{city}</span>
              <span className="w-0 overflow-hidden group-hover:ml-2 group-hover:w-4 transition-all duration-200">
                →
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
