//prompt to enter what you want to search
var search = prompt("Search anything and stream live tweets", "Enter the Matrix");

//search data emit
if (search != null) {
	socket.emit('test', search);
}


//track active columns
var columns = ["a","b","c","d","e","f","g","h","i","j","k","l"];

var colActive = 0;

//listen for twitter response and post data
socket.on('tweets', function(tweets){

	var colSelect = colActive;

	console.log(tweets);

	if (colActive <= 11) {
		colActive++;
	}
	if (colActive >= 12) {
		colActive = 0;
	}

	//check if column is even or odd
	if (colActive % 2 == 0) {
	
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

			var columnUp = document.getElementById(columns[colSelect]).appendChild(poster);

			//advance the loop
			i++;

			//autoscroll
			var tracker = document.getElementById(columns[colSelect]);
			tracker.scrollTop = tracker.scrollHeight;

			//loop interval time
		}, 250);
	}

	//for every other column
	else {
		//makeshift loop that I can control
		var i = 0;

		var timer2 = setInterval(function(){

			//when it comes to the last char of the tweet it stops
			if (i >= tweets.length) {
				clearInterval(timer);
			};

			//grab the chars one at a time from the tweet
			var charSelect2 = tweets.substring(i, (i + 1));

			//post it to the column
			var poster2 = document.createElement('DIV');
			var stacker2 = document.createElement('BR')

			poster2.appendChild(document.createTextNode(charSelect2));
			poster2.appendChild(stacker2);

			//stacking in opposite way
			//this may not be working the way I want
			//it's too hard to tell with the skewed data right now
			var columnDown = document.getElementById(columns[colSelect]);
			columnDown.insertBefore(poster2, columnDown.childNodes[0]);

			//advance the loop
			i++;

			//autoscroll in reverse
			var tracker2 = document.getElementById(columns[colSelect]);
			tracker2.scrollTop = !tracker2.scrollHeight;

			//loop interval time
		}, 250);
	}




});