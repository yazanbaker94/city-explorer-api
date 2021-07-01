const axios = require('axios');

let moviesController=(req, res) => {
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
    
  }

  class Movies {
    constructor(movieData) {
      this.title = movieData.title
      this.total_votes=movieData.vote_count
      this.image_url='http://image.tmdb.org/t/p/w342'+movieData.poster_path
    }
  }

  module.exports=moviesController