var express = require('express');
var router = express.Router();
const movie_controller = require('../controllers/movieController')

/* GET home page. */
router.get('/', movie_controller.index);

router.get('/movies', movie_controller.movie_list)


module.exports = router;
