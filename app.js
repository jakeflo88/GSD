var nothing = "Excellent"

function testRun(){
	socket.emit('test', nothing);
};

socket.on('tweets', function(tweets){
	var newTweet = document.createElement('DIV');

	newTweet.appendChild(document.createTextNode(tweets));

	document.getElementById('landing').appendChild(newTweet);
});
