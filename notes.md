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
    movie_franchise: movie_franchise._id
    director: director._id,
    actors: [actor._id],
    genre: [genre._id]
  }

  - Actor = {
    name: String
    movies: [movies._id],
    directors_worked: [director._id]
    birth_year:
    years_working:
  }

  - Director = {
    name: String
    movies: [movies._id],
    main_actors: [actor._id],
    favourite_genres: [genres._id]
  }

  - Genre = {
    name:String
  }

>URL action + this._id