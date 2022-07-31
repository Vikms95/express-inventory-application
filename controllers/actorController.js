const Actor = require('../models/Actor');
const Movie = require('../models/Movie');

const {body, validationResult} = require('express-validator')
const async = require('async')


exports.actor_list = function(req, res, next){
  Actor
    .find({}, 'name')
    .exec(function(err, actor_list){
      if(err) return next(err)
      res.render('actor_list', {title: 'Actor list', actor_list: actor_list})
    })
}

exports.actor_detail = function(req, res, next){
  // Find the actor that appears on the request.parameters.id
  async.parallel({
    actor: function(callback){
      Actor
        .findById(req.params.id)
        .exec(callback)
    },
    
    movies: function(callback){
      Movie
      // Do I need to use the Schema.Types.Id in the array???
      // Find all the movies that have the ID from the request url within its actors array
        .find({'actors': req.params.id})
        .exec(callback)
        
    }
  },function(err, results){
    if(err) return next(err)
    res.render('actor_detail', {actor: results.actor, movies: results.movies})
  })
}

exports.actor_create_get = function(req, res, next){
  Movie
    .find()
    .exec(function(err, movie_list){
      if(err) return next(err)
      console.log("Hi");
      
      res.render('actor_create',
      {
        title:'Create Actor', 
        movie_list: movie_list
      })
    })
}

exports.actor_create_post = [
  body('name')
    .trim()
    .isAlphanumeric()
    .withMessage('Name must be alphanumeric')
    .escape(),


  (req, res, next) =>{
    const errors = validationResult(req)
    const actor = new Actor({
      name: req.body.name,
      movies: req.body.movies
    })

    if(!errors.isEmpty()){
      // Reload actor form page with errors
      Movie
      .find()
      .exec(function(err, movie_list){
        if(err) return next(err)
        res.render('actor_create',
        {
          title:'Create Actor', 
          movie_list: movie_list,
          errors: errors.array()
        })
      })
    }else{
      // We save the actor
      actor.save(function(err){
        if(err) return next(err)
        res.redirect(actor.url)
      })
    }
  }
]

exports.actor_update_get = function(req, res, next){
  // Get the id of actor from req.params
  async.parallel({
    actor: function(callback){
      Actor
        .findById(req.params.id)
        .exec(callback)
    },
    // Find all movies 
    movies: function(callback){
      Movie
        .find()
        .exec(callback)
    }
  }, function(err, results){
      if(err) return next(err)
      res.render('actor_create', 
      {
        title:'Update actor', 
        actor: results.actor,
        movie_list: results.movies
      })
    }
    )
  }
  
  exports.actor_update_post = [
    // Sanitize inputs
  body('name')
    .isString()
    .withMessage('Enter a valid name')
    .escape(),
    (req, res, next) => {
      const errors = validationResult(req)
      // Create new actor based on req.body values
    const actor = new Actor({
      _id: req.params.id,
      name: req.body.name,
      movies: req.body.movies
    })
    console.log(actor);
    
    // if errors
    if(!errors.isEmpty()){
      
      // res.render form page with the errors as an extra parameter
      async.parallel({
        actor: function(callback){
          Actor
          .findById(req.params.id)
          .exec(callback)
        },
        // Find all movies 
        movies: function(callback){
          Movie
          .find()
          .exec(callback)
        }
      }, function(err, results){
        if(err) return next(err)
        res.render('actor_create', 
        {
          title:'Update actor', 
          actor: results.actor,
          movie_list: results.movies,
          errors: errors.array()
        })
      }
      )
    // if no errors
    }else{
      console.log(actor.movies)
      // findByIdAndUpdate the actor and redirect to the updatedActor.url 
      Actor.findByIdAndUpdate(req.params.id, actor, {}, function(err, updatedActor){
        if(err) return next(err)
        res.redirect(updatedActor.url)
      })
    }
  }
]