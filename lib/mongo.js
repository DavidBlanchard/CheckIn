var MongoClient = require('mongodb').MongoClient;  //Caps for class
var db;

MongoClient.connect('mongodb://localhost:27017/checkInDb', function(err, database) {
  if (err) throw err;
  db = database;
});

exports.addAttendee = function(attendee, callback) {
  //todo : valiodate input
  db.collection('attendees').insert(attendee, function (err, doc){
    if (err) {
      callback(null);
    }
    else {
      callback(doc);
    }
  });
};

exports.getAttendees = function(callback) {
  db.collection('attendees').find({}).toArray(function(err, attendees){
    if (err) {
      callback([]);
    }
    else {
      callback(attendees);
    }    
  });
};

