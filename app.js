var firebase = require('firebase');
var AWS = require('aws-sdk');

var firebaseRef = new Firebase(process.env.FIREBASE_URL);

firebaseRef.authWithCustomToken(process.env.FIREBASE_TOKEN, function (error, authData) {
  if (error) {
    console.log(error);
  }

  firebaseRef.on('value', function(snapshot) {
    var now = new Date();
    var filename = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() + '.json';

    var s3bucket = new AWS.S3({
      params: {
        Bucket: process.env.S3_BUCKET,
        Key: filename
      }
    });

    s3bucket.upload({Body: JSON.stringify(snapshot.exportVal())}, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to S3");
      }
    });
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

})
