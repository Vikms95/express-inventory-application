let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ActorSchema = new Schema({
  name: {type: String, maxLength: 50},
  movies: {type: [Schema.Types.ObjectId]},
})

ActorSchema
  .virtual('url')
  .get(function(){
    return '/actor/' + this._id
  })

module.exports = mongoose.model('ActorSchema', ActorSchema)