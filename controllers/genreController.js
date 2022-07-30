const Genre = require('../models/Genre')

exports.genre_list = function(req, res, next){
  Genre
    .find({}, 'name')
    .exec(function(err, genre_list){
      res.render('genre_list', {title: 'Genre List', genre_list: genre_list})
    })
}