require('dotenv').config();
const express = require('express');
const axios = require('axios');
const redis = require('redis');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.port 


class WeatherAPI {
  constructor() {
    this.baseUrl = process.env.baseURL;
    this.APIKey = process.env.APIKey;
    this.GeoURl = process.env.GeoURl;
    
    
   
  }
    //TODO: use redis to cache cordinates Error redis Close
    // async fetchCoordinates(location) {
    //   try {
    //     console.log('Fetching coordinates for', location);
  
    //     const getCachedCoordinates = async (location) => {
    //       const cachedCoordinates = await this.redisClient.getAsync(location).catch((error) => {
    //         console.log('Error fetching from Redis:', error.message);
    //         throw error;
    //       });
    //       return JSON.parse(cachedCoordinates);
    //     };
  
    //     const setCachedCoordinates = async (location, coordinates) => {
    //       await this.redisClient.setAsync(location, JSON.stringify(coordinates), 'EX', 3600);
    //     };
  
    //     const cachedCoordinates = await getCachedCoordinates(location);
  
    //     console.log('Cached coordinates:', cachedCoordinates);
  
    //     if (cachedCoordinates) {
    //       const [lon, lat] = cachedCoordinates;
    //       console.log(`Coordinates for ${location} (from cache):`, lon, lat);
    //       return [lon, lat];
    //     }
  
    //     const reqs = `${this.GeoURl}?q=${location}&limit=1&appid=${this.APIKey}`;
    //     const res = await axios.get(reqs);
  
    //     const lon = res.data[0].lon;
    //     const lat = res.data[0].lat;
  
    //     await setCachedCoordinates(location, [lon, lat]);
  
    //     console.log(`Coordinates for ${location} (fetched and cached):`, lon, lat);
  
    //     return [lon, lat];
    //   } catch (err) {
    //     console.error('Error fetching coordinates:', err.message);
    //     throw new Error('Error fetching coordinates');
    //   }
    // }
  async fetchCoordinates(location) {
    const reqs = `${this.GeoURl}?q=${location}&limit=1&appid=${this.APIKey}`;
    try {
      const res = await axios.get(reqs);
      let lon = res.data[0].lon;
      let lat = res.data[0].lat;
      console.log(lat, lon)
      return [lon, lat];
    } catch (e) {
      console.error('Error fetching coordinates:', e.message);
      throw new Error('Error fetching coordinates');
    }
  }

  async getWeather(location) {
    try {
      const [lon, lat] = await this.fetchCoordinates(location);
      const data = await this.fetchData(lat, lon);
      return data.conditions
    } catch (e) {
      console.error('Error: ' + e.message);
      throw e; 
    }
  }

  async fetchData(lat, lon) {
    try {
      const response = await axios.get(
        `${this.baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.APIKey}`
      );
      
      const data = {
        conditions: response.data.current.weather[0].description,
        temp_celicius: response.data.current.temp,
        humidity: response.data.current.humidity
      };
      //console.log(data)
      return data;
    } catch (e) {
      console.error('API call error:', e.message);
      throw new Error('API call error');
    }
  }
}
// create class instance
const weatherAPI = new WeatherAPI();

app.get('/weather/:location', async (req, res) => {
  const { location } = req.params;
  console.log(location)
  try {
    // extract latitude and longitude from the location
    const [lat, lon] = await weatherAPI.fetchCoordinates(location);
    console.log(lat, lon)
    // Fetch weather data using the extracted lat and lon
    const data = await weatherAPI.fetchData(lat, lon);
    console.log('Weather data ',data)
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify({weatherData:data}));
  } catch (error) {
    console.log(error)
    res.status(500).send('Error: ' + error.message);
  }
});

app.get('/history/:lat/:lon/:date', async (req, res) => {
  const { lat, lon, date } = req.params;
  try {
    const data = await weatherAPI.fetchData(lat, lon, new Date(date));
    res.send(data);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
