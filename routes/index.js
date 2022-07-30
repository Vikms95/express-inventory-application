var express = require('express');
var router = express.Router();
const movie_controller = require('../controllers/movieController')
const actor_controller = require('../controllers/actorController')
const genre_controller = require('../controllers/genreController')
const movieinstance_controller = require('../controllers/movieInstanceController')

router.get('/', movie_controller.index);

// MOVIE ROUTES
router.get('/movies', movie_controller.movie_list)

router.get('/movie/:id', movie_controller.movie_detail)


// ACTOR ROUTES
router.get('/actors', actor_controller.actor_list)

router.get('/actor/:id', actor_controller.actor_detail)

// GENRES ROUTES

router.get('/genres', genre_controller.genre_list)

//  MOVIE INSTANCES ROUTES
router.get('/movieinstances', movieinstance_controller.movie_instance_list)

module.exports = router;
