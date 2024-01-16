import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import React from 'react';
import bg from '../assets/bg.jpg';
import axios from 'axios';

const ForecastTable = ({forecastData}) => {
  if (forecastData == null || forecastData === undefined) {
    return null
  }
  return (
    <table className="w-full table-auto">
    <thead>
      <tr className="bg-teal-500 text-white">
        <th className="py-2 px-4 text-left">Day</th>
        <th className="py-2 px-4 text-left">Weather Condition</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(forecastData).map(([day, condition], index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'hover:bg-gray-100'}>
          <td className="py-2 px-4">{day}</td>
          <td className="py-2 px-4">{condition}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

function Landing() {
  const defaultLocation = 'Kasese';
  const [CityName, setCityName] = useState(defaultLocation);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecaste] = useState(defaultLocation)
  const [searched, setSearched] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const currentWeatherData = async (city) => {
    //console.log('Fetching weather for:' ,city)
    try {
      const response = await axios.get(`http://localhost:1234/weather/${city}`);
      setWeatherData(response.data.CurrentWeather);
      setDataLoaded(true)
    } catch (err) {
      console.error('Error fetching data', err);
      setWeatherData(null);
      setDataLoaded(true)
    }
  };
  const forecastWeatherData = async (city) => {
    console.log('Fetching forecast for:', city)
    try{
      const res = await axios.get(`http://localhost:1234/daily/${city}`);
      //console.log(res.data.ForecasteData);
      setForecaste(res.data.ForecasteData);
    } catch (err) {
      console.log('Error fetching forecast data', err);
      setForecaste(null)
    }
  }

  useEffect(() => {
    // Fetch data for default city when the page loads
   currentWeatherData(defaultLocation)
   forecastWeatherData(defaultLocation)
  }, []);
  
  const handleLocationChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (CityName) {
      await currentWeatherData(CityName);
      await forecastWeatherData(CityName);
      setSearched(true);
      setDataLoaded(false)
    }
  };

  return (
    <div className='w-full h-screen py-6' style={{ backgroundImage: `url(${bg})` }}>
      <div className='md:max-w-[1480px] m-auto grid grid-cols-2 max-w-[600px] py-4'>
        <div className="flex flex-col ">
          <p className="text-6xl text-[#0e7490] font-bold py-2">Get Accurate forecasts</p>
          <p className="text-2xl text-black">Weather Data at your fingertips</p>
          <p className="text-1xl text-[#57534e] pt-6">Search by location | Get your forecast</p>
          <form onSubmit={handleSearch} className="max-w-[500px] shadow-lg rounded-md flex justify-between pb-2">
            <input
              className="bg-stone-200 w-full rounded-md border-none h-8 px-3"
              type="text"
              value={CityName}
              onChange={handleLocationChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Enter location..!!"
            />
            <button type='button'>
              <BiSearchAlt2
                size={20}
                className='icon'
                style={{ color: '#000' }}
              />
            </button>
          </form>
          {weatherData ? (
          <div className="border border-solid border-gray-300 p-4 rounded-lg max-w-[500px]">
           <p className={`bg-[#0e7490] to-transparent p-4 text-lg text-white shadow-lg rounded-t-lg ${searched ? 'visible' : 'hidden'}`}>
                Current Weather for <span className="font-bold">{CityName}</span>
              </p>
            <table className="table-auto w-full">
              <tbody>
                <tr className="bg-gray-200">
                  <td className="py-2 px-4 font-semibold">Weather Conditions</td>
                  <td className="py-2 px-4 text-teal-600 font-semibold">{weatherData.conditions}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Temperature (Cel)</td>
                  <td className="py-2 px-4 text-teal-600 font-semibold">{weatherData.temp}</td>
                </tr>
                  <tr className="bg-gray-200">
                    <td className="py-2 px-4 font-semibold">Humidity</td>
                    <td className="py-2 px-4 text-teal-600 font-semibold">{weatherData.humidity}</td>
                </tr>
              </tbody>
            </table>
          </div>
          ) : (
          <p className="text-red-400">No data available. Please check your location or try again later.</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">

          <h2 className="text-2xl font-semibold mb-4">8-Day Forecast for {CityName}</h2>
          <ForecastTable forecastData={forecast} />
        </div>
      </div>
  </div>
  );
}

export default Landing;
