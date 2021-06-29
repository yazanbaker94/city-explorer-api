const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const weather = require('./data/weather.json');

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

 app.get('/weather',  (req, res) => {
  let lat=req.query.lat
  let lon=req.query.lon
  let searchQuery=req.query.searchQuery

  try{let findData=()=>{
    let city=weather.find((city, idx) => {
      return (city.city_name.toLowerCase()===searchQuery.toLowerCase() && city.lat === Number(lat) && city.lon === Number(lon))
    })
    console.log(city.data)
    return city.data.map(item=> {
      return new Forecast(item)
    }
    )
  }
  res.json(findData());
}catch(error){
  res.status(500).json({message:"something went wrong"})
  
}
  

  });
    
       
 
 
app.listen(process.env.PORT) // kick start the express server to work

class Forecast {
    constructor(weatherData) {
      this.date = weatherData.valid_date;   
      this.description = weatherData.weather.description;
    }
  }

