const router = require('express').Router();
const { estimator } = require('../controller/estimator');


router.post('/:resFormat', estimator);
router.post('/', estimator);


module.exports = router;
