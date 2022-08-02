const Movie = require('../models/Movie')
const Actor = require('../models/Actor')
const Genre = require('../models/Genre')
const MovieInstance = require('../models/MovieInstance')

const {body, validationResult} = require('express-validator')
const async = require('async');
const { off } = require('../models/Movie');

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
      res.render('movie_detail', {movie: results, name: results.name, franchise: results.movie_franchise, genre: results.genre, actors: results.actors})
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
    res.render('movie_create', {title:'Create movie', genres: results.genres, actors: results.actors})
  }
  
  )  
}

exports.movie_create_post = [    
  // Sanitize inputs with body method
  body('name', 'Name must be alphanumeric')
    .trim()
    .isAlphanumeric()
    .escape(),

  body('genres')
    .isIn(['Action','Drama','Thriller','Sci-Fi'])
    .withMessage('Genre name must be within the proposed values')
    .trim()
    .isAlpha()
    .withMessage('Genre name must contains only letters')
    .escape(),
  
  body('actors')
    .trim()
    .isAlphanumeric()
    .withMessage('Actor name contain only letters')
    .escape(),

  (req, res, next) => {
    // Check with validationResult(req)
    const errors = validationResult(req)
    
    let movie = new Movie({
      name: req.body.name,
      actors: req.body.actors,
      genre: req.body.genres
    })
    // If errors were found in the validation
    if(!errors.isEmpty()){
      // Redirect user to the form
      async.parallel({
        genres: function(callback){
          Genre.find(callback)
        },
        actors: function(callback){
          Actor.find(callback)
        }
      }, function(err, results){
        if(err) return next(err)
        res.render('movie_create', 
          {
            title:'Create movie',
            genres: results.genres, 
            actors: results.actors, 
            movie:movie, 
            errors: errors.array()
          })
      })
    // If no errors were found 
    }else{
      movie.save(function(err){
        if(err) return next(err)
        res.redirect(movie.url)
      })
    }
  }
]

exports.movie_update_get = function(req, res, next){
  async.parallel({
    // Get the id of the movie from the req.params
    movie: function(callback){
      Movie
        .findById(req.params.id)
        .populate('actors')
        .exec(callback)
    },
    // Get all the genres and actors
    genres: function(callback){
      Genre.find().exec(callback)
    },
    actors: function(callback){
      Actor.find().exec(callback)
    }
  }, function(err, results){
      if(err) return next(err)
      // Render the movie_create template 
      // with the name already inserted in the input fields as value
      res.render('movie_create', 
      {
        title:'Update movie', 
        movie: results.movie, 
        genres: results.genres,
        actors: results.actors
      })
  })
}

exports.movie_update_post = [
  (req, res, next) =>{
    const errors = validationResult(req)
    const movie = new Movie({
      _id: req.params.id,
      name: req.body.name,
      actors: req.body.actors,
      genre: req.body.genres
    })
    if(!errors.isEmpty()){
      // Redirect to the form with errors as parameter
      async.parallel({
        genres: function(callback){
          Genre.find(callback)
        },
        actors: function(callback){
          Actor.find(callback)
        }
      }, function(err, results){
        if(err) return next(err)
        res.render('movie_create', 
          {
            title:'Update movie',
            genres: results.genres, 
            actors: results.actors, 
            movie: movie, 
            errors: errors.array()
          })
      })
      
    }else{
      // Find and update the movie
      Movie.findByIdAndUpdate(req.params.id, movie, {}, function(err, updatedMovie){
        if(err) return next(err)
        res.redirect(updatedMovie.url)
      })
    }
  }
]


exports.movie_delete_get = function(req, res, next){
// Get all the instances of the movie by finding if any has the movie value the same as req.params.id?
// Load the movie_delete template
// if any instances exist
  // load the template with the instances, asking to delete them before and no confirm delete button
// if no instances exist
  // load the template asking for a confirmation to delete 
// Test with LOTR that has 2 instances
  async.parallel({
    movieinstances: function(callback){
      MovieInstance
      .find({'movie': req.params.id})
      .exec(callback)
    },
    movie: function(callback){
      Movie
        .findById(req.params.id)
        .exec(callback)
    }
  }, function(err, results){
    if(err) return next(err)
      res.render('movie_delete', {title:'Delete Movie',movie: results.movie, movieinstances: results.movieinstances})
  })
}

exports.movie_delete_post = function(req, res, next){
  // Get the movie id from req.body.movieid
  // Use the findByIdAndDelete method
  // Redirect to movie list
  Movie
    .findByIdAndDelete(req.body.movieid, function(err){
      if(err) return next(err)
      res.redirect('/movies')
    })
}