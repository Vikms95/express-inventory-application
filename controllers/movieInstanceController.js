const MovieInstance = require('../models/MovieInstance')
const Movie = require('../models/Movie')
const async = require('async')

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

}