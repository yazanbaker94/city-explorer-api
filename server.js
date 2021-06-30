const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const axios = require('axios');
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();

// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World')
 } )

 app.get('/weather',  (req, res) => {
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
    
 
 });
 
app.listen(process.env.PORT) // kick start the express server to work


app.get('/movies', (req, res) => {
  let movies;
  let movieName = req.query.query


  
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`

  axios.get(url).then(response => {
    movies = response.data.results
  
    
    let movieData = movies.map(item => {
      return new Movies(item);
    });
    res.json(movieData)
  }).catch(error =>res.send('something is wrong'))
  
})






class Forecast {
    constructor(weatherData) {
      this.date = weatherData.valid_date;   
      this.description = weatherData.weather.description;
    }
  }
  
class Movies {
  constructor(movieData) {
    this.title = movieData.title
    this.total_votes=movieData.vote_count
    this.image_url='http://image.tmdb.org/t/p/w342'+movieData.poster_path
  }
}