var router = require('express').Router();
console.log('en users router');
router.get('/:userid', require('../controllers/users/user-profile')); 
router.get('/all', require('../controllers/users/get-all')); 
router.get('/:username/all', require('../controllers/users/get-user-urls')); 
router.post('/newuser', require('../controllers/users/newuser')); 
router.post('/newurl', require('../controllers/users/reduceUrl')); 
router.post('/newregister', require('../controllers/users/postUrls')); 
router.post('/newurl2', require('../controllers/users/reduceUrl2')); 

module.exports = router;