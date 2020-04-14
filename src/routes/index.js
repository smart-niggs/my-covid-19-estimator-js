const router = require('express').Router();
const { estimator, logs } = require('../controller/estimator');


router.get('/logs', logs);
router.post('/:resFormat', estimator);
router.post('/', estimator);


module.exports = router;
