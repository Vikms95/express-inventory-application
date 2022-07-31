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
<>
  - Actor = {
    name: String
    movies: [movies._id],
  }

  - Genre = {
    name:String
  }

>URL action + this._id


<!-- - Create index view -->
<!-- - Create view to see all movies(movie_list.pug) -->
<!-- - Create actor details -->
<!-- - Whenever an actor is created, create its movies array based on the movies it appears -->
  <!-- :I need to use id within the array to be able to reference it? -->
  <!-- :find Scçhema.Types.ObjectId in array, I already got how to populate a field that contains an id -->
<!-- - Find all bookinstances, no matter what the book is -->
<!-- - Implement form to create movies -->
<!-- - Implement movie creation -->
  <!-- :movie is not being created? find if code needs to be added -->
    <!-- :cannot validate if the value exists within an array of values with express-validator? -->
- Implement movie update
- Implement actor creation
- Implement actor update
