const Movie = require('../models/Movie')
const Actor = require('../models/Actor')
const Genre = require('../models/Genre')

const async = require('async');

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
    .exec(function(err, list_movies) {
      if(err) return next(err)
      res.render('movie_list', {title: 'List of movies', movie_list: list_movies})
  })
}

exports.movie_detail = function(req, res, next){
  Movie
    .findById(req.params.id)
    .populate('actors')
    .exec(function(err, results) {
      if(err) return next(err)
      res.render('movie_detail', {name: results.name, franchise: results.movie_franchise, genre: results.genre, actors: results.actors})
    })
}

exports.movie_create_get = function(req, res, next){
  async.parallel({
    genres: function(callback){
      Genre.find(callback)
    },
    actors: function(callback){
      Actor.find(callback)
    }
  }, function(err, results){
    if(err) return next(err)
    // Create template
    console.log(results.actors);
    
    res.render('movie_create', {title:'Create movie', genres: results.genres, actors: results.actors})
  }
  
  )  
}
