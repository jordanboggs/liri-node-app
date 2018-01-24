/*
 * Language Interpretation and Recognition Interface (LIRI)
 * By Jordan Boggs
 * Submitted as part of University of Denver Coding Bootcamp
 * January 2018
 */

const fs = require("fs");

/* Functions! */
const logIt = require("./logIt.js");
const myTweets = require("./myTweets");
const spotifyThisSong = require("./spotifyThisSong");

const movieThis = function(movie) {
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
  const request = require("request");

  if (!movie) {
    movie = '"Mr. Nobody"';
    fs.appendFileSync("log.txt", "\nmovie-this:" + "\n", function(err) {
      if (err) {
        console.log(err);
      }
    });
    console.log("You can specify a movie with format 'node liri.js <movie>'" +
    "\nThe default movie is Mr. Nobody.\n");
  }
  else {
    fs.appendFileSync("log.txt", "\nmovie-this: "+ movie + "\n", function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

  request('http://www.omdbapi.com/?apikey=trilogy&t='+movie, /*{options: "json"},*/
  function(error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    else {
      let parsedResponse = JSON.parse(response.body);
      logIt("Title: " + parsedResponse.Title);
      logIt("Year: " + parsedResponse.Year);
      logIt("IMDB Rating: " + parsedResponse.imdbRating);
      logIt("Rotten Tomatoes Rating: " +
        parsedResponse.Ratings[2].Value);
      logIt("Country: " + parsedResponse.Country);
      logIt("Language: " + parsedResponse.Language);
      logIt("Plot: " + parsedResponse.Plot);
      logIt("Actors: " + parsedResponse.Actors);
    }
  });
};

const doWhatItSays = function() {
  // Using the fs Node package, LIRI will take the text inside of random.txt
  // and then use it to call one of LIRI's commands.

  fs.appendFileSync("log.txt", "\ndo-what-it-says:\n", function(err) {
    if (err) {
      console.log(err);
    }
  });
  
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
      return;
    }

    let dataArray = data.split(",");
    switch (dataArray[0]) {
      case "my-tweets":
      case "get-tweets":
        myTweets(dataArray[1]);
        break;
      case "spotify-this-song":
        spotifyThisSong(dataArray[1]);
        break;
      case "movie-this":
        movieThis(dataArray[1]);
        break;
      default:
        console.log("File random.txt did not have valid data.");
    }
  });
};

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
