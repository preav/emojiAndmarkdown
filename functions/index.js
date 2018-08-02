const functions = require('firebase-functions');


exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

var opengraph = require('opengraph-io')({appId: 'AIzaSyA70kKXU1kEh3fox32qZp8_7I9ONFuVJXs', cacheOk: false});

const targetUrl = 'https://www.facebook.com';
opengraph.getSiteInfo('http://news.com' , function(err, result){
   console.log('Site title is', result.hybridGraph.title);
});

