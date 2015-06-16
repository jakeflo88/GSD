var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var twit = require('twitter'),
	twitter = new twit({
		consumer_key: 'RPFqdVUwMX8stpdBRx8BmaoVv',
		consumer_secret: 'L2zVazkwzCtTLU8oXjZxNSh7LUYi49hQI9QmJn77UQyQoSTuLF',
		access_token_key: '805173362-Wlxn87138lIK2DLXNrTwjKOZoeDesqki5oKRM3Kn',
		access_token_secret: 've79nUIkLp52jX08DdsSi1t9O1OEJ2VEWwQyNyy7WcwCp'
	});

var count = 0,
	util = require('util'),
	tweetHandler = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
 
  console.log("connection");

  	//receive the search data entered by user
  	socket.on('test', function(nothing, first){

  		//track tweets containing user iput
		twitter.stream('statuses/filter', {track: nothing}, function(stream){

			//error check on stream
			stream.on('error', function(error){
				throw error;
			});

			//stream of data from twitter api
			stream.on('data', function(data){

				//check stream in console
				console.log(data.text);

				//push tweets to an array
				tweetHandler.push(data.text);

				//to begin displaying the tweets
				if (first && tweetHandler[0]) {

					//get the first tweet from the array
					socket.emit('tweets', tweetHandler[0] + " *** ");

					//remove said tweet from the array
					tweetHandler.splice(0, 1);

					//since this is only needed for the first tweet
					first = !first;
				}
			});

		}); 
	});

  	//after the first tweet is finished displaying, move to the next column
  	//this is triggered at the end of the interval set for displaying tweets

  	//PROBLEM is that it will wait one time for the first column to finish
  	//but the rest of the columns begin one after another after the first
  	//character is displayed rather than the last.
  	//This causes the columns to run out of control

  	//listening for the end of the previous column
	socket.on('nextCol', function(first) {
	
		//send the next tweet from the array
		socket.emit('tweets', tweetHandler[0] + " *** ");

		//then remove it
		tweetHandler.splice(0, 1);
	});
});



app.use(express.static(__dirname));

http.listen(3000, function(){
  console.log('listening on *:3000');
});


