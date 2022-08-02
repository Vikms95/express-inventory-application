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
<!-- - Implement movie update -->
<!-- - Implement actor creation -->
<!-- -Delete movie
-Delete actor -->
<!-- -Implement all movieinstance route methods -->

-Movie is not showing on template when creating an actor
  :after doing the delete methods, it does not seem to be even included within the actor array?
    :double check what are we doing when creating the actor
    :how are they created on populatedb?
-Movie is not updating when updating an actor

EXTRA CREDIT: For bonus points, try to figure out how to add and upload images for each item. Use this middleware which was created by the Express team. The documentation in the README there should be enough to get you going.
EXTRA CREDIT: We will learn about creating users with secure passwords in a later lesson, but for now we don’t want just anyone to be able to delete and edit items in our inventory! Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action.
