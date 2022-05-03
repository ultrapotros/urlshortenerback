const router = require('express').Router();
console.log('en index routes');
router.use('/users', require('./users'));
router.use('',require('./redirect.js'));
module.exports = router;