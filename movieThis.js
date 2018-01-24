const fs = require("fs");
const logIt = require("./logIt");

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

module.exports = movieThis;
