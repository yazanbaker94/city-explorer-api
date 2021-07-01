const axios = require('axios');
const Forecast=require('./forecast')
const Cache=require('./cache')


let oneMinute = 200 * 60;
let cache= new Cache();
cache['data']=[];
let x=cache['timestamp']=Date.now()
const weatherController=(req, res) => {
    let weather;
    let newx = cache['timestamp2']=Date.now()
    let lat=req.query.lat
    let lon=req.query.lon
    let arrayOfData=[];

    if(lat && lon) {
        if(cache.data.length > 0 && x+oneMinute>=newx){
            arrayOfData=cache.data.map(data => new Forecast(data))
            console.log('from cache')
            res.send(arrayOfData)
            
        }else{
            let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=-${lon}`
            axios.get(url).then(response => {
              weather = response.data
              arrayOfData = weather.data.map((item, indx) => {
                return new Forecast(item);
              });
              cache['data']=weather.data
              console.log(cache)
              console.log('data coming from api')
              res.send(arrayOfData)
              
              if (arrayOfData === 0) {
                res.status(500).send('theres something wrong')
              }
            }).catch(error =>res.send('something is wrong'));
              
            // 
            

        }
    }
   
  
   }
 


  



   module.exports=weatherController