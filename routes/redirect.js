var router = require('express').Router();

router.get('/:shortid', require('../controllers/users/get-longurl')); 

module.exports = router;