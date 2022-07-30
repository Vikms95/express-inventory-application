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


<!-- - Create index view -->
- Create view to see all movies(movie_list.pug)
- Make movies not depend on actors on database populate process or viceversa
