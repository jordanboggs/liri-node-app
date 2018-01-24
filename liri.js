/*
 * Language Interpretation and Recognition Interface (LIRI)
 * By Jordan Boggs
 * Submitted as part of University of Denver Coding Bootcamp
 * January 2018
 */

const logIt = require("./logIt.js");
const myTweets = require("./myTweets");
const spotifyThisSong = require("./spotifyThisSong");
const movieThis = require("./movieThis");
const doWhatItSays = require("./doWhatItSays");

/* Commands */
switch (process.argv[2]) {
  case "my-tweets":
    // get-tweets makes more sense semantically, but I'm leaving my-tweets in
    // for the sake of homework
  case "get-tweets":
    myTweets(process.argv[3]);
    break;
  case "spotify-this-song":
    spotifyThisSong(process.argv[3]);
    break;
  case "movie-this":
    movieThis(process.argv[3]);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("ERROR: Valid commands are get-tweets, spotify-this-song, " +
      "movie-this, do-what-it-says");
}
