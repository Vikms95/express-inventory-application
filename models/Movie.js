let mongoose = require('mongoose')
let Schema = mongoose.Schema

let MovieSchema = new Schema({
  name: {type: String, required: true, maxLength: 50},
  movie_franchise: {type: String},
  actors: {type: [Schema.Types.ObjectId]},
  genre: {type: String}
})

MovieSchema
  .virtual('url')
  .get(function() {
    return '/movie/' + this._id
  })

module.exports = mongoose.model('MovieSchema', MovieSchema)