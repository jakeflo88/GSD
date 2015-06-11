var twit = require('twitter'),
	twitter = new twit({
		consumer_key: 'RPFqdVUwMX8stpdBRx8BmaoVv',
		consumer_secret: 'L2zVazkwzCtTLU8oXjZxNSh7LUYi49hQI9QmJn77UQyQoSTuLF',
		access_token_key: '805173362-Wlxn87138lIK2DLXNrTwjKOZoeDesqki5oKRM3Kn',
		access_token_secret: 've79nUIkLp52jX08DdsSi1t9O1OEJ2VEWwQyNyy7WcwCp'
	});

var count = 0;
	util = require('util');

twitter.stream('statuses/filter', {track: 'love'}, function(stream){

	stream.on('error', function(error){
		throw error;
	});

	stream.on('data', function(data){
		console.log(data.text);


	});

});


