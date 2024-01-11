import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import React from 'react';
import img from '../assets/img.avif';
import bg from '../assets/bg.jpg';
import axios from 'axios';

function Landing() {
  const defaultLocation = 'Kasese';
  const [CityName, setCityName] = useState(defaultLocation);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    console.log('Fetching weather for:' ,city)
    try {
      const response = await axios.get(`http://localhost:1234/weather/${city}`);
      setWeatherData(response.data.weatherData);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  useEffect(() => {
    // Fetch data for efault city when the page loads
   fetchWeatherData(defaultLocation)
  }, []);

  const handleLocationChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (CityName) {
      fetchWeatherData(CityName);
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
            <p className="bg-gradient-to-r from-slate-500 via-slate-50 to-transparent p-4 text-lg">Current Weather for <span className="font-bold">{CityName}</span></p>
            <p>Weather Conditions <span className="text-teal-600 font-semibold">{weatherData.conditions}</span></p>
            <p>Temperature(cel) <span className="text-teal-600 font-semibold">{weatherData.temp_celicius}</span></p>
            <p>Humidity <span className="text-teal-600 font-semibold">{weatherData.humidity}</span></p>
            {/* Add more weather data fields as needed */}
            </div>) : (
            <p>No data available. Please check your location or try again later.</p>
            )}
        </div>
        <img src={img} className='md:order-last order-first h-62' />
      </div>
    </div>
  );
}

export default Landing;
