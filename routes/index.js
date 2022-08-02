var express = require('express');
var router = express.Router();
const path = require('path')
const movie_controller = require('../controllers/movieController')
const actor_controller = require('../controllers/actorController')
const genre_controller = require('../controllers/genreController')
const movieinstance_controller = require('../controllers/movieInstanceController')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) =>  {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})


// HOMEPAGE
router.get('/', movie_controller.index);

// MOVIE ROUTES
router.get('/movies', movie_controller.movie_list)

router.get('/movie/create', movie_controller.movie_create_get)

router.get('/movie/:id/update', movie_controller.movie_update_get)

router.get('/movie/:id', movie_controller.movie_detail)

router.post('/movie/create', upload.single('avatar'), movie_controller.movie_create_post)

router.post('/movie/:id/update', movie_controller.movie_update_post)

router.get('/movie/:id/delete', movie_controller.movie_delete_get) 

router.post('/movie/:id/delete', movie_controller.movie_delete_post)
// -- Pending





// ACTOR ROUTES
router.get('/actors', actor_controller.actor_list)

router.get('/actor/create', actor_controller.actor_create_get)

router.get('/actor/:id/update', actor_controller.actor_update_get)

router.get('/actor/:id', actor_controller.actor_detail)

router.post('/actor/create', actor_controller.actor_create_post)

router.post('/actor/:id/update', actor_controller.actor_update_post)

router.get('/actor/:id/delete', actor_controller.actor_delete_get)

router.post('/actor/:id/delete', actor_controller.actor_delete_post)


// -- Pending





//  MOVIE INSTANCES ROUTES
router.get('/movieinstances', movieinstance_controller.movie_instance_list)

router.get('/movieinstance/create', movieinstance_controller.movieinstance_create_get)

router.get('/movieinstance/:id', movieinstance_controller.movie_instance_details)

router.post('/movieinstance/create', movieinstance_controller.movieinstance_create_post)

router.get('/movieinstance/:id/update', movieinstance_controller.movieinstance_update_get)

router.post('/movieinstance/:id/update', movieinstance_controller.movieinstance_update_post)

router.get('/movieinstance/:id/delete', movieinstance_controller.movieinstance_delete_get)

router.post('/movieinstance/:id/delete', movieinstance_controller.movieinstance_delete_post)

// -- Pending





// GENRES ROUTES
router.get('/genres', genre_controller.genre_list)


module.exports = router;
