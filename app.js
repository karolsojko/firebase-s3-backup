var fs = require('fs');
var firebase = require('firebase');

var firebaseRef = new Firebase('https://unleash-app-staging.firebaseio.com/');

firebaseRef.authWithCustomToken('0NFoMPLS9qPgmsYV5GRtPH5a6d0UW1tWwu3zimyu', function (error, authData) {
  if (error) {
    console.log(error);
  }

  firebaseRef.on('value', function(snapshot) {
    var now = new Date();
    var filename = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() + '.json';

    fs.writeFile('data/' + filename, JSON.stringify(snapshot.exportVal()), function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Saved succesfully!');
        process.exit();
      }
    });
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

})
