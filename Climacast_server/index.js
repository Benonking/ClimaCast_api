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
    this.HistUrl = process.env.HistUrl
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
  async fetchCoordinates(location, date) {
    const reqs = `${this.GeoURl}?q=${location}&limit=1&appid=${this.APIKey}`;
    try {
      const res = await axios.get(reqs);
      let lon = res.data[0].lon;
      let lat = res.data[0].lat;
      console.log(lat, lon)
      return [lon, lat];
    } catch (e) {
      console.error('Error fetching coordinates:', e.message);
      //throw new Error('Error fetching coordinates');
    }
  }

  async getCurrentWeather(location) {
    try {
      const [lon, lat] = await this.fetchCoordinates(location);
      const data = await this.fetchData(lat, lon);
      return data.conditions
    } catch (e) {
      console.error('Error: ' + e.message);
      throw e; 
    }
  }
  async getForecast(location){
    try{
      const [lat, lon] = await this.fetchCoordinates(location);
      const data = await this.fetchData(lat, lon);
      return data.dailyForecast
    }catch(e) {
    console.error('Error: ' + e.message);
    throw e;
  }
}
async getHistory(location, date = 'Jan 12, 21'){
  try{
    
    const dateObj = new Date(date);
    const timestamp = dateObj.getTime()
    const [lat, lon] = await this.fetchCoordinates(location);
    const finalTimestamp = isNaN(timestamp) ? Date.now() : timestamp;
    console.log(lat, lon, timestamp)
    const histurl = `${this.HistUrl}lat=${lat}&lon=${lon}&dt=${finalTimestamp}&appid=${this.APIKey}`
    const res = await axios.get(histurl);
    return res.data.data.weather[0].description.conditions
  } catch (e){
    console.log(e)
  }
}

  async fetchData(lat, lon) {
    try {
      const response = await axios.get(
        `${this.baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.APIKey}`
      );
      // forecast dictionary or object
      let forecast = {}
      for(let i= 0; i < response.data.daily.length ; i++) {
        let date = response.data.daily[i].dt
        date =  new Date(date * 1000).toLocaleString(
          'en-Us', {
          day:'2-digit',
          year:'2-digit',
          month:'short'
        });
        let weather = response.data.daily[i].weather[0].description
        //create k,v of date and coresponding weather
        forecast[date] = weather
      }
      const data = {
        conditions: response.data.current.weather[0].description,
        temp_celicius: response.data.current.temp,
        humidity: response.data.current.humidity,
        dailyForecast: forecast
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
  console.log(`Current weather for ${location}`)
  try {
    const data = await weatherAPI.getCurrentWeather(location);
    console.log(`Current weather for ${location}`,data)
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify({CurrentWeather:data}));
  } catch (error) {
    console.log(error)
    res.status(500).send('Error: ' + error.message);
  }
});

app.get('/daily/:location', async(req, res) => {
  const {location} = req.params
  try{
    const forecastdata   = await weatherAPI.getForecast(location);
    console.log(`Forecaste for ${location}`, forecastdata)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ForecasteData: forecastdata}));
  }catch (error) {
    console.log(error);
    res.status(500).send('Error: ' + error.message);
  }
})
app.get('/history/:location/:date', async (req, res) => {
  const { location, date } = req.params;
  //convert date to unix time
  //date = new Date()
  try {
    const data = await weatherAPI.getHistory(location, date);
    console.log(`Historical data for ${location} on ${date}`, data);
    //set response Header
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({Historydata:data}));
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
