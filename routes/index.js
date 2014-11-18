var express = require('express');
var router = express.Router();
var database = require('../lib/mongo.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {});
});


router.post('/users', function(req, res) {
  console.log('first name: ' + req.param('firstName'));
  console.log('last name: ' + req.param('lastName'));
  console.log('email: ' + req.param('email'));
  console.log('contribution: ' + req.param('contribution'));
  console.log('first time: ' + req.param('firstTime'));
  console.log('sex: ' + req.param('sex'));
  var user = {
    fname: req.param('firstName'),
    lname: req.param('lastName'),
    email: req.param('email'),
    contrib: req.param('contribution'),
    dob: req.param('bday'),
    newAttendee: req.param('firstTime'),
    gender: req.param('sex')
  }
  database.addAttendee(user, function (doc){
    res.end(doc ? 'ok' :'error');    
  })

});

router.get('/list', function(req, res) {
  database.getAttendees(function(attendees){
    res.render('list', {attendees: attendees, total: attendees.length });    
  });
});

module.exports = router;
