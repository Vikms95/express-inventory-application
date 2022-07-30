var express = require('express');
var router = express.Router();
const movie_controller = require('../controllers/movieController')
const actor_controller = require('../controllers/actorController')
const movieinstance_controller = require('../controllers/movieInstanceController')

router.get('/', movie_controller.index);

// MOVIE ROUTES
router.get('/movies', movie_controller.movie_list)

router.get('/movie/:id', movie_controller.movie_detail)


// ACTOR ROUTES
router.get('/actors', actor_controller.actor_list)

router.get('/actor/:id', actor_controller.actor_detail)

module.exports = router;
