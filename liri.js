const fs = require("fs");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request");
const keys = require("./keys.js");

//gets commands from bash arguements
let command = process.argv[2];
let secCommand = process.argv[3];

//determines which command to execute;
if(command == "my-tweets"){
	getTweets();
}else if(command == "spotify-this-song"){
	getSong();
}else if(command == "movie-this"){
	getMovie();
}else if(command == "do-what-it-says"){
	console.log("Executing: Do What it Says")
}else{
	console.log("Try one of these commands:");
	console.log('A) "my-tweets"');
	console.log('B) "spotify-this-song" along with a song within quotations');
	console.log('C) "movie-this"');
	console.log('D) "do-what-it-says"');
};


//define function to return tweets
function getTweets(){
	//lets user know function is running
	console.log("Executing: Retrieve Tweets");

	//retrieves keys and tokens from keys.js
	let client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret,
  });

  let tUser = "Henry_F_Winkler";

  	client.get('statuses/user_timeline', {screen_name: tUser}, function(error, tweets, response) {
  		if(error){
  			console.log(error);
  		}
   		for(let i = 0;i<tweets.length;i++){
   			console.log("Tweet content: " + tweets[i].text);
   			console.log("Tweet date/time: " + tweets[i].created_at);
   		}
	});
};


//define function to execute spotify
function getSong(){

	//lets user know function is running
	console.log("Executing: Spotify");

	let spotify = new Spotify({
		id: keys.spotifyKeys.client_id,
		secret: keys.spotifyKeys.token_secret,
	});

	let track = secCommand;

	if(track == undefined){
		track = "The Sign Ace of Base"
	}

	//lets user know what is being searched
	console.log("Inputed: " + track);

	spotify.search({ type: 'track', query: track, limit : 1 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    //sets result to first returned track of data.items array
    let result = data.tracks.items[0];

    console.log("Artist: " + result.artists[0].name);

    console.log("Track Title: " + result.name);

    if(result.preview_url === null){
    	console.log("Preview link not provided")
    }else{
    	console.log("Link: " + result.preview_url);
    }

    console.log("Album: " + result.album.name);
	});
}


//define function to get movie
function getMovie(){

	//lets user know function is running
	console.log("Executing: Movies")
}