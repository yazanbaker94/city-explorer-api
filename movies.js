const axios = require('axios');
const Movies=require('./moviesClass')
const Cache=require('./cache')

let oneMinute = 200 * 60;
let oneHr = 300 * 60;
let cache= new Cache();
cache['data']=[];
let x=cache['timestamp']=Date.now()



let moviesController=(req, res) => {
  
    let newx = cache['timestamp2']=Date.now()
    
    let movies;
    let movieName = req.query.query
    let arrayOfData=[];
    if(movieName) {
      if(cache.data.length > 0 && x+oneMinute>=newx){
          arrayOfData=cache.data.map(data => new Movies(data))
          console.log('from cache')
          res.send(arrayOfData)
      }else{
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`
    axios.get(url).then(response => {
    movies = response.data.results
    arrayOfData = movies.map(item => {
        return new Movies(item);
      });
      cache['data']=movies
              // console.log(cache)
              console.log('data coming from api')
              res.send(arrayOfData)
      res.json(arrayOfData)
    }).catch(error =>res.send('something is wrong'))
    
  }
    }
  }


  module.exports=moviesController