let Movie = require('../models/Movie')
let Actor = require('../models/Actor')
let async = require('async')

exports.index =  function(req, res, next){
  // Count the items to be able to show them on the index
  async.parallel({
    movie_count: function(callback){
      Movie.countDocuments({}, callback)
    },
    actor_count: function(callback){
      Actor.countDocuments({}, callback)
    }
  }, function(err, results){
    if (err) return next(err)
    
    res.render('index', {title: 'Movie Inventory', error: err, data: results})
  })
}

exports.movie_list = function(req, res, next){
  Movie
    .find({}, 'name')
    .exec(function( err, list_movies) {
      if(err) return next(err)
      console.log(list_movies);
      
      res.render('movie_list', {title: 'List of movies', movie_list: list_movies})
    })
  }