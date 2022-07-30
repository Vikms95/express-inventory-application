#! /usr/bin/env node

console.log('This script populates the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
// Require models and store them in a variable to use them
var MovieInstance = require('./models/MovieInstance')
var Movie = require('./models/Movie')
var Actor = require('./models/Actor')
var Genre = require('./models/Genre')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var movieInstances = []
var movies = []
var actors = []
var genres = []

function actorCreate(name, cb) {
  let actordetail = {
    name: name,
  }
  
  let actor = new Actor(actordetail);
       
  actor.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Actor: ' + actor);
    actors.push(actor)
    cb(null, actor)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}


function movieCreate(name, movie_franchise, actors, genre, cb) {
  moviedetail = { 
    name: name,
    movie_franchise: movie_franchise,
    actors: [...actors],
    genre: [...genre]
  }
    
  var movie = new Movie(moviedetail);    
  movie.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Movie: ' + movie);
    movies.push(movie)
    cb(null, movie)
  });
}


function movieInstanceCreate(movie, status, cb) {
  movieinstancedetail = { 
    movie: movie,
  }    
  if (status != false) movieinstancedetail.status = status
    
  var movieinstance = new MovieInstance(movieinstancedetail);    
  movieinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING movieInstance: ' + movieinstance);
      cb(err, null)
      return
    }
    console.log('New movieInstance: ' + movieinstance);
    movieInstances.push(movieinstance)
    cb(null, movie)
  }  );
}


function createGenreActors(cb) {
    async.series([
      // - Actor = {
      //   name: String
      //   top_movies: [movies._id],
      //   directors_worked: [director._id]
      // }

      // - Genre = {
      //   name:String
      // }
        function(callback) {
          actorCreate('Benedict Cumberbatch' ,callback);
        },
        function(callback) {
          actorCreate('Ewan McGregor',  callback);
        },
        function(callback) {
          actorCreate('Viggo Mortensen',  callback);
        },
        function(callback) {
          actorCreate('Natalie Portman',  callback);
        },
        function(callback) {
          actorCreate('Marion Cotillard',  callback);
        },
        function(callback) {
          genreCreate("Action", callback);
        },
        function(callback) {
          genreCreate("Thriller", callback);
        },
        function(callback) {
          genreCreate("Drama", callback);
        },
        function(callback) {
          genreCreate("Sci-Fi", callback);
        },
        ],
        // optional callback
        cb);
}


function createMovies(cb) {
    async.parallel([
      // - Movie = {
      //   name: String
      //   movie_franchise: movie_franchise._id
      //   actors: [actor._id],
      // }
        function(callback) {
          movieCreate('The Lord of the Rings: The Return of the King', 'The Lord of the Rings', [actors[2].name], [genres[0].name], callback);
        },
        function(callback) {
          movieCreate('Star Wars: A New Hope', 'Star Wars',[actors[1].name], [genres[3].name] , callback);
        },
        function(callback) {
          movieCreate('Avengers: Endgame', 'Avengers', [actors[0].name], [genres[0].name, genres[2].name, genres[3].name], callback);
        },
        ],
        // optional callback
        cb);
}


function createMovieInstances(cb) {
    async.parallel([
      // - MovieInstance = {
      //   movie: movie._id,
      //   status: status,
      // }
        function(callback) {
          movieInstanceCreate(movies[0], 'Available', callback)
        },
        function(callback) {
          movieInstanceCreate(movies[0], 'Loaned', callback)
        },
        ],
        // Optional callback
        cb);
}



async.series([
    createGenreActors,
    createMovies,
    createMovieInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+ movieInstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



