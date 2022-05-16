const router = require('express').Router();
router.use('/urls', require('./urls'));
module.exports = router;