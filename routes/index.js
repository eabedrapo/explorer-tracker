const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Explorer Tracker', brand: 'Explorer Tracker'});
});

router.get('/createCharter', (req, res) => {
    res.render('newCharterForm', { title: 'Create a Charter', brand: 'Explorer Tracker'});
});

module.exports = router;
