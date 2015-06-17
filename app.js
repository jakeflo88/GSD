//prompt to enter what you want to search
var search = prompt("Search anything and stream live tweets", "Enter the Matrix");

//to start the first column
var gateTrig = true;


//search data emit
if (search != null) {
	socket.emit('test', search, colActive, gateTrig);
	console.log("Woo");
}


//track active columns
var columns = ["a","b","c","d","e","f","g","h","i","j","k","l"];

var colActive = 0;

//listen for twitter response and post data
socket.on('tweets', function(tweets){

	console.log("Here we go again", colActive);

	//keep track of which column is active
	var colSelect = colActive;

	//advance the column to next
	if (colActive <= 11) {
		colActive++;
	}

	//when it gets to the last column, jump back to the first
	if (colActive > 12) {
		return;
	}


	if (colActive <= 11) {
		//check if column is even or odd
		if (colActive % 2 == 0) {
		
			//makeshift loop that I can control
			var i = 0;

			var timer = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i >= tweets.length) {
					clearInterval(timer);
					i = 0;
					socket.emit('nextCol', colActive, gateTrig);
					console.log("Hoo");
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
			}, 100);
		}

		//for every other column, same as above, but posts characters in reverse order
		//the idea is that every other column displays in opposite direction
		else {
			//makeshift loop that I can control
			var i2 = 0;

			var timer2 = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i2 >= tweets.length) {
					clearInterval(timer);
					i2 = 0;
					socket.emit('nextCol', colActive, gateTrig);
					console.log("Hoo2");
				};

				//grab the chars one at a time from the tweet
				var charSelect2 = tweets.substring(i2, (i2 + 1));

				//post it to the column
				var poster2 = document.createElement('DIV');
				var stacker2 = document.createElement('BR')

				poster2.appendChild(document.createTextNode(charSelect2));
				poster2.appendChild(stacker2);

				//stacking in opposite direction
				var columnDown = document.getElementById(columns[colSelect]);
				columnDown.insertBefore(poster2, columnDown.childNodes[0]);

				//advance the loop
				i2++;

				//autoscroll in reverse
				var tracker2 = document.getElementById(columns[colSelect]);
				tracker2.scrollTop = !tracker2.scrollHeight;

				//loop interval time
			}, 100);
		}
	}
});