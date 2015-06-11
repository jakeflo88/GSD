//prompt to enter what you want to search
var search = prompt("Type anything to explore live tweets", "Enter the Matrix");

//search data emit
if (search != null) {
	socket.emit('test', search);
}

//listen for twitter response and post data
socket.on('tweets', function(tweets){
	

//Basic display
/*
	var newTweet = document.createElement('DIV');

	newTweet.appendChild(document.createTextNode(tweets));

	document.getElementById('landing').appendChild(newTweet);
*/
});
