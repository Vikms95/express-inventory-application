const async = require('async')
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');

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
  // Load actor_details template with the object obtained
}