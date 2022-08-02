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
        .populate('movies')
        .exec(callback)
    },
    
    movies: function(callback){
      Movie
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
  body('name')
    .isString()
    .withMessage('Enter a valid name')
    .escape(),
    (req, res, next) => {
      const errors = validationResult(req)
      const actor = new Actor({
        _id: req.params.id,
        name: req.body.name,
        movies: req.body.movies
    })
    if(!errors.isEmpty()){
      async.parallel({
        actor: function(callback){
          Actor
          .findById(req.params.id)
          .exec(callback)
        },
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
    }else{
      Actor.findByIdAndUpdate(req.params.id, actor, {}, function(err, updatedActor){
        if(err) return next(err)
        res.redirect(updatedActor.url)
      })
    }
  }
]

exports.actor_delete_get = function(req, res, next){
  // Actor depends on movie
  // Get the actor with the req.params.id form actor_detail
  // Get the movies where the actor has participated by searching for the movie actors array(you already did this with the actor detail)
  // If any, the actor_delete does not show the delete button, but the list of movies to delete inbeforehand
  async.parallel({
    actor: function(callback){
      Actor
        .findById(req.params.id)
        .exec(callback)
    },
    movies: function(callback){
      Movie
        .find({'actors': req.params.id})
        .exec(callback)
    }
  }, function(err, results){
    if(err) return next(err)
    res.render('actor_delete', {title: 'Delete Actor', actor: results.actor, movies: results.movies})
  })
}

exports.actor_delete_post = function(req, res, next){
  // Get id from actor from the req.body.actorid
  // Use findByIdAndDelete
  // Redirect to actor list
  Actor
    .findByIdAndDelete(req.body.actorid, function(err){
      if(err) return next(err)
      res.redirect('/actors')
    })
}