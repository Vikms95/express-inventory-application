const MovieInstance = require('../models/MovieInstance')
const Movie = require('../models/Movie')

const async = require('async')
const {body, validationResult} = require('express-validator');
const e = require('express');

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

exports.movieinstance_update_get = function(req, res, next){
  // Find all the movies
  // Render the movieinstance form with the movies array
  Movie
  .find()
  .exec(function(err, movies){
    res.render('movie_instance_create', {title:'Update Movie Instance', movies: movies})
  })
}

exports.movieinstance_update_post = [
  // Sanitize input fields
  // If error
    // Re render form template with errors array
  // If no error
    // Use findByIdAndUpdate() with the req.params.id of the movieinstance
  body('status')
    .trim()
    .isAlphanumeric()
    .withMessage('Enter a valid status value')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    const movieinstance = new MovieInstance({
      _id: req.params.id,
      movie: req.body.movie,
      status: req.body.status
    })

    if(!errors.isEmpty()) {
      Movie
      .find()
      .exec(function(err, movies){
        res.render('movie_instance_create', {title:'Update Movie Instance', movies: movies, errors: errors.array()})
      })
    } else {
      MovieInstance.findByIdAndUpdate(req.params.id, movieinstance, {}, function(err, updatedMovieInstance){
        if(err) return next(err)
        res.redirect(updatedMovieInstance.url)
      })
    }
  }
]

exports.movieinstance_delete_get = function(req, res, next){
  MovieInstance
    .findByIdAndDelete(req.params.id)
    .populate('movie')
    .exec(function(err, movieinstance){
      if(err) return next(err)
      res.render('movieinstance_delete', {title:'Delete Movie Instance', movieinstance:movieinstance})
    })
}

exports.movieinstance_delete_post = function(req, res, render){
  MovieInstance
    .findByIdAndDelete(req.body.movieid, function(err){
      if(err) return next(err)
      res.redirect('/movieinstances')
    })
}