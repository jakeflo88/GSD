//prompt to enter what you want to search
var search = prompt("Type anything to explore live tweets", "Enter the Matrix");

//search data emit
if (search != null) {
	socket.emit('test', search);
}

//listen for twitter response and post data
socket.on('tweets', function(tweets){
	
	var i = 0;

	var timer = setInterval(function(){

		if (i >= tweets.length) {
			clearInterval(timer);
		};

		var charSelect = tweets.substring(i, (i + 1));

		var poster = document.createElement('DIV');
		var stacker = document.createElement('BR')

		poster.appendChild(document.createTextNode(charSelect));
		poster.appendChild(stacker);

		document.getElementById('a').appendChild(poster);

		i++;


	}, 500);

});