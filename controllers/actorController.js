let mongoose = require('mongoose')
let async = require('async')
let Actor = require('../models/Actor')

exports.actor_list = function(req, res, next){
  Actor
    .find({}, 'name')
    .exec(function(err, actor_list){
      if(err) return next(err)
      res.render('actor_list', {title: 'Actor list', actor_list: actor_list})
    })
}

exports.actor_detail = function(req, res, next){
  
}