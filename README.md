# WeatherVista - Weather Dashboard
A beautiful, responsive weather dashboard built with React, Tailwind CSS, and Framer Motion. Get real-time weather data and forecasts with an elegant dark/light mode interface.

## Features

- 🌦️ Real-time weather data
- 📊 5-day forecast with interactive charts
- 🌗 Dark/Light mode toggle
- 📱 Fully responsive design
- 🚀 Fast and lightweight
- 🌍 Global location search

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later) or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/adway7103/Weather-App-Assignment.git
   cd Weather-App-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHER_API_KEY=a13cbfbee52e8a1ed0656c1346845c79
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Usage

### Getting Started
1. Open the app in your browser (default: `http://localhost:5173`)
2. Use the search bar to find weather for any location
3. Toggle between dark/light mode using the moon/sun icon

### Dashboard Features
- **Home**: Overview of current weather conditions
- **Dashboard**: Detailed forecast with temperature charts
- **Location Search**: Find weather for any city worldwide

## Deployment

### Netlify
1. Import your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## Technologies Used

- ⚛️ React
- 🎨 Tailwind CSS
- ✨ Framer Motion
- 🌐 React Router
- 📊 Recharts
- 🌦️ OpenWeatherMap API

🔧 API Integration
OpenWeatherMap API
Required API Key: Get yours at OpenWeatherMap or "a13cbfbee52e8a1ed0656c1346845c79"

Rate Limits:

Free tier: 60 calls/minute

Paid plans available for higher limits

Endpoints Used:

Geocoding API (location search)

Current Weather Data

5-Day Weather Forecast

---

For support or questions, please open an issue on GitHub or contact adwaylachhiramka@gmail.com .
