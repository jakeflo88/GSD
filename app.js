var search = prompt("Type anything to explore live tweets", "Enter the Matrix");


if (search != null) {
	socket.emit('test', search);
}

socket.on('tweets', function(tweets){
	var newTweet = document.createElement('DIV');

	newTweet.appendChild(document.createTextNode(tweets));

	document.getElementById('landing').appendChild(newTweet);
});
