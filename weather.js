const axios = require('axios');

const weatherController=(req, res) => {
    let weather;
    let lat=req.query.lat
    let lon=req.query.lon
   
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=-${lon}`
    axios.get(url).then(response => {
      weather = response.data
      let forecastArray = weather.data.map((item, indx) => {
        return new Forecast(item);
      });
      res.json(forecastArray)
      if (forecastArray === 0) {
        res.status(500).send('theres something wrong')
      }
    }).catch(error =>res.send('something is wrong'));
      
   
   }
 

class Forecast {
    constructor(weatherData) {
      this.date = weatherData.valid_date;   
      this.description = weatherData.weather.description;
    }
  }
  



   module.exports=weatherController