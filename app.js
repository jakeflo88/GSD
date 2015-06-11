//prompt to enter what you want to search
var search = prompt("Type anything to explore live tweets", "Enter the Matrix");

//search data emit
if (search != null) {
	socket.emit('test', search);
}

//listen for twitter response and post data
socket.on('tweets', function(tweets){
	
	//makeshift loop that I can control
	var i = 0;

	var timer = setInterval(function(){

		//when it comes to the last char of the tweet it stops
		if (i >= tweets.length) {
			clearInterval(timer);
		};

		//grab the chars one at a time from the tweet
		var charSelect = tweets.substring(i, (i + 1));

		//post it to the column
		var poster = document.createElement('DIV');
		var stacker = document.createElement('BR')

		poster.appendChild(document.createTextNode(charSelect));
		poster.appendChild(stacker);

		document.getElementById('a').appendChild(poster);

		//advance the loop
		i++;

		//autoscroll
		var tracker = document.getElementById('a');
		tracker.scrollTop = tracker.scrollHeight;

		//loop interval time
	}, 200);

});