const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Charter = mongoose.model('Charter');

router.get('/', (req, res) => {
    Charter.find()
        .then((charters) => {
            res.render('index', {title: 'Explorer Tracker - Charters', charters});
            })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/createCharter', (req, res) => {
    res.render('newCharterForm', { title: 'Explorer Tracker - Create a Charter'});
});

router.post('/', (req, res) => {
    const charter = new Charter(req.body);
    charter.save()
    .then(() => { res.redirect('/'); })
    .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
    });
  });

module.exports = router;
