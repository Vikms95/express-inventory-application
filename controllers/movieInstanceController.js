const MovieInstance = require('../models/MovieInstance')
const Movie = require('../models/Movie')

const async = require('async')
const {body, validationResult} = require('express-validator')

exports.movie_instance_list = function(req, res, next){
  MovieInstance
    .find()
    .populate('movie')
    .exec(function(err, movieinstances_list){
      if(err) return next(err)
      res.render('movie_instance_list', {title:'Movie Instances', movieinstances_list: movieinstances_list})
    })
}
exports.movie_instance_details = function(req, res, next){
  MovieInstance
    .findById(req.params.id)
    .populate('movie')
    .exec(function(err, movieinstance){
      if(err) return next(err)
      res.render('movieinstance_details', {title: movieinstance.movie.name , movieinstance: movieinstance})
    })
}

exports.movieinstance_create_get = function(req, res, next){
  // Find all movies
  // Render movie_instance_create with the movies array
  Movie
    .find()
    .exec(function(err, movies){
      if(err) return next(err)
      res.render('movie_instance_create', {title:'Create Movie Instance', movies: movies})
    })
}

exports.movieinstance_create_post = [
  // Validate fields
  // Create a new movieinstance with req.body values
  // Use movieinstance.save and redirect to the movieinstance.url
  body('status')
    .trim()
    .isAlphanumeric()
    .withMessage('Please enter a valid status')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    const movieinstance = new MovieInstance({
      movie: req.body.movie,
      status: req.body.status
    })

    if(!errors.isEmpty()) {
      Movie
      .find()
      .exec(function(err, movies){
        if(err) return next(err)
        res.render('movie_instance_create', {title:'Create Movie Instance', movies: movies, errors: errors.array()})
      })
    } else {
      movieinstance.save(function(err){
        if(err) return next(err)
        res.redirect(movieinstance.url)
      })
    }
  }
]