let Movie = require('../models/Movie')
let Actor = require('../models/Actor')
let async = require('async')

exports.index =  function(req,res){
  // Count the items to be able to show them on the index
  async.parallel({
    movie_count: function(callback){
      Movie.countDocuments({}, callback)
    },
    actor_count: function(callback){
      Actor.countDocuments({}, callback)
    }
  }, function(err, results){
    console.log(results);
    
    res.render('index', {title: 'Movie Inventory', error: err, data: results})
  })
}