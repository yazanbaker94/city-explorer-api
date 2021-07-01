class Movies {
    constructor(movieData) {
      this.title = movieData.title
      this.total_votes=movieData.vote_count
      this.image_url='http://image.tmdb.org/t/p/w342'+movieData.poster_path
    }
  }


  module.exports=Movies