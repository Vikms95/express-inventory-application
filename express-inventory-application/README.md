Movie database
  - MovieInstance
  - Movie
  - Director
  - Actor
  - Genre


Models
  - MovieInstance = {
    movie: movie._id,
    status: status,
  }

  - Movie = {
    name: String
    top_movies: [top_movies]
    actors: [actor._id],
  }

  - Actor = {
    name: String
    movies: [movies._id],
  }

  - Genre = {
    name:String
  }

>URL action + this._id

TODO- Introduce database data
Leave the Object.id fields as empty? or reference within the array with referenceArray[index]

-Fix this error:
FINAL ERR: ValidationError: actors.0: Cast to [ObjectId] failed for value "[ [] ]" (type string) at path "actors.0" because of "CastError"