/*
 * Language Interpretation and Recognition Interface (LIRI)
 * By Jordan Boggs
 * Submitted as part of University of Denver Coding Bootcamp
 * January 2018
 */

const keys = require("./keys.js");
const Twitter = require("twitter");

/* Functions! */
// const logIt = function() {
//   // This will log the command and the data it outputs to log.txt
// }

const myTweets = function(user) {
  // This will show your last 20 tweets and when they were created at in your
  // terminal/bash window.
  const client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

  if (!user) {
    user = "cher";
    console.log("Loading default Twitter user, @cher\n");
  }

  let twitterFeed = client.get("statuses/user_timeline",
   {screen_name: user, count: 20}, function(error, tweets, response) {
    if (error) {
      console.log(error);
    }
    else {
      for (index = 0; index < tweets.length; index++) {
        console.log(`${(index + 1)}: ${tweets[index].text}`);
      }
    }
  });
};

const spotifyThisSong = function() {
  /*
   * This will show the following information about the song in your4
   * terminal/bash window:
   * * Artist(s)
   * * The song's name
   * * A preview link of the song from Spotify
   * * The album that the song is from
   * If no song is provided then your program will default to "The Sign"
   * by Ace of Base.
   */
};

const movieThis = function() {
  /*
   * This will output the following information to your terminal/bash window:
   * * Title of the movie.
   * * Year the movie came out.
   * * IMDB Rating of the movie.
   * * Rotten Tomatoes Rating of the movie.
   * * Country where the movie was produced.
   * * Language of the movie.
   * * Plot of the movie.
   * * Actors in the movie.
   * If the user doesn't type a movie in, the program will output data for the
   * movie 'Mr. Nobody.'
   */
};

const doWhatItSays = function() {
  // Using the fs Node package, LIRI will take the text inside of random.txt
  // and then use it to call one of LIRI's commands.
};

/* Commands */
switch (process.argv[2]) {
  case "my-tweets":
    myTweets(process.argv[3]);
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("ERROR: Valid commands are my-tweets, spotify-this-song, " +
      "movie-this, do-what-it-says");
}
