const fs = require("fs");
const logIt = require("./logIt");
const myTweets = require("./myTweets");
const spotifyThisSong = require("./spotifyThisSong");
const movieThis = require("./movieThis");

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

module.exports = doWhatItSays;
