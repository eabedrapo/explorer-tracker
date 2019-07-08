const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Charter = mongoose.model('Charter');
const Session = mongoose.model('Session');

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

router.get('/charterPage', (req, res) => {
    Charter.findById(req.query.id)
        .then( charter => res.render('charterPage', { title: 'Explorer Tracker - ' + charter.charter, charter}));
});

router.get('/executionForm', (req, res) => {
    session = new Session();
    session._id = new mongoose.Types.ObjectId();
    session.charter = req.query.id;
    Charter.findById(req.query.id, function (err, charter) {
        charter.sessions.push(session);
        charter.save();
        console.log(charter);
    })
        .then( charter => res.render('executionForm', { title: 'Explorer Tracker - ' + charter.charter, charter, session}));
});

router.post('/', (req, res) => {
    const charter = new Charter(req.body);
    charter._id = new mongoose.Types.ObjectId();
    charter.save()
    .then(() => { res.redirect('/'); })
    .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
    });
  });

module.exports = router;
