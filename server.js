const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const weatherData = require('./data/weather.json');

app.use(cors()) // after you initialize your express app instance
require('dotenv').config();

// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World')
 } )

//  app.get('/weather/:name', (req, res) => {
//      if(req.params.name.toLowerCase() === 'seattle') {
//          res.json(weatherData.find( ({ city_name }) => city_name === 'Seattle' ));
//      } else if(req.params.name.toLowerCase() === 'amman') {
//         res.json(weatherData.find( ({ city_name }) => city_name === 'Amman' ));
//      } else if(req.params.name.toLowerCase() === 'paris') {
//         res.json(weatherData.find( ({ city_name }) => city_name === 'Paris' ));
//      }
//  })

 app.get('/weather', function (req, res) {
    const arrOfData = weatherData.map(info => new Forecast(info));
    res.send(arrOfData);
  });
    
       
 
 
app.listen(process.env.PORT) // kick start the express server to work

class Forecast {
    constructor(data) {
      this.date = weatherData.valid_date;   
      this.description = weatherData.description;
    }
  }

