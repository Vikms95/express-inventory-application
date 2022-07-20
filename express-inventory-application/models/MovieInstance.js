let mongoose = require('mongoose')
let Schema = mongoose.Schema

let MovieInstanceSchema = new Schema(
  {
    movie:{type: Schema.Types.ObjectId, ref: 'Movie', required: true},
    status:{type: String}
  }
)

MovieInstanceSchema
  .virtual('url')
  .get(function() {
    return '/catalog/movieinstance/' + this._id
  })

module.exports = mongoose.model('MovieInstance', MovieInstanceSchema)