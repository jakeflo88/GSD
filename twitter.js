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
	tweetHandler = [],
	gate = [];



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
 
  console.log("connection");

  	//receive the search data entered by user
  	socket.on('test', function(nothing, starter, first){


  		gate[starter] = first;
  		console.log("********Hi Friend!");

  		//track tweets containing user iput
		twitter.stream('statuses/filter', {track: nothing}, function(stream){

			console.log("********Get Up!")

			//error check on stream
			stream.on('error', function(error){
				throw error;
			});

			//stream of data from twitter api
			stream.on('data', function(data){

				console.log("********GET THE FUCK UP!");

				//check stream in console
				console.log(data.text);

				//push tweets to an array
				tweetHandler.push(data.text);

				//to begin displaying the tweets
				if (gate[starter] === first && tweetHandler[0]) {

					//get the first tweet from the array
					socket.emit('tweets', tweetHandler[0] + " *** ");

					//remove said tweet from the array
					tweetHandler.splice(0, 1);

					gate[starter] = !first;
					console.log("********Close the gate");
				}
			});

		}); 
	});


  	//doesn't work right yet, but closer than before
  	//maybe not
	socket.on('nextCol', function(column, second) {

		for (i = 0; i <= gate.length; i++) {
			gate[i] = second;
		}

		gate[column] = second;
		
		if (gate[column] === second && tweetHandler[0]) {	

			//send the next tweet from the array
			socket.emit('tweets', tweetHandler[0] + " *** ");

			//then remove it
			tweetHandler.splice(0, 1);

			gate[column] = !second;
		}
	});

});




app.use(express.static(__dirname));

http.listen(3000, function(){
  console.log('listening on *:3000');
});


