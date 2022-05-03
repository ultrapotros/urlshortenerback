var router = require('express').Router();

/* router.get('/:userid', require('../controllers/users/user-profile'));  */
router.get('/tadu/:shortid', require('../controllers/users/redirect')); 
router.put('/modify/:id/:newshorturl', require('../controllers/users/modifyurl')); 
router.get('/:username/all', require('../controllers/users/get-user-urls')); 
router.post('/newuser', require('../controllers/users/newuser')); 
router.post('/newregister', require('../controllers/users/postUrls')); 
router.delete('/delete', require('../controllers/users/delete-url')); 

module.exports = router;