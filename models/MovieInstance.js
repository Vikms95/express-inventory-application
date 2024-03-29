let mongoose = require('mongoose')
let Schema = mongoose.Schema

let MovieInstanceSchema = new Schema(
  {
    movie:{type: Schema.Types.ObjectId, ref: 'MovieSchema', required: true},
    status:{type: String}
  }
)

MovieInstanceSchema
  .virtual('url')
  .get(function() {
    return '/movieinstance/' + this._id
  })

module.exports = mongoose.model('MovieInstance', MovieInstanceSchema)