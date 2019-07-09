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
    Charter.findById(req.query.id).populate('sessions')
        .then( charter => res.render('charterPage', { title: 'Explorer Tracker - ' + charter.charter, charter}));
});

router.get('/executionForm', (req, res) => {
    Charter.findById(req.query.id)
        .then( charter => res.render('executionForm', { title: 'Explorer Tracker - ' + charter.charter, charter, time: Date.now()}));
});

router.get('/sessionSheet', (req, res) => {
    Session.findById(req.query.id).populate('charter')
        .then( session => res.render('sessionSheet', { title: 'Explorer Tracker - ' + session.charter.charter, session}));
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

  router.post('/executionForm', (req, res) => {
    const session = new Session(req.body);
    session._id = new mongoose.Types.ObjectId();
    session.charter = req.body.charterid;
    Charter.findById(req.body.charterid)
    .exec(function(err,charter) {
        charter.sessions.push(session._id);
        charter.save();
    })
    session.save()
    .then(() => { res.redirect('/charterPage?id=' + req.body.charterid); })
    .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
    });
  });

module.exports = router;
