/*
 * Language Interpretation and Recognition Interface (LIRI)
 * By Jordan Boggs
 * Submitted as part of University of Denver Coding Bootcamp
 * January 2018
 */

const keys = require("./keys.js");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const fs = require("fs");

/* Functions! */
const logIt = function(string) {
  // This will log the command and the data it outputs to log.txt
  console.log(string);
  fs.appendFileSync("log.txt", string + "\n", function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
}

const myTweets = function(user) {
  // This will show the last 20 tweets for a user and when they were created
  // in your terminal/bash window.

  const client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  if (!user) {
    user = "cher";
    fs.appendFileSync("log.txt", "\nget-tweets:"+"\n", function(err) {
      if (err) {
        console.log(err);
      }
    });
    console.log("You can specify a user with format 'node liri.js <user>'\n" +
      "Loading default Twitter user, @cher.\n");
  } else {
    fs.appendFileSync("log.txt", "\nget-tweets: "+user+"\n", function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

  let twitterFeed = client.get("statuses/user_timeline",
   {screen_name: user, count: 20}, function(error, tweets, response) {
    if (error) {
      console.log(error);
      return;
    }
    else {
      for (index = 0; index < tweets.length; index++) {
        logIt(`${(index + 1)}: ${tweets[index].text}`);
      }
    }
  });
};

const spotifyThisSong = function(song) {
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

  if (!song) {
    song = '"The Sign"';
    fs.appendFileSync("log.txt", "\nspotify-this-song:"+"\n", function(err) {
      if (err) {
        console.log(err);
      }
    });
    console.log("You can specify a song with format 'node liri.js <song>'\n" +
      "The default song is The Sign by Ace of Base.\n");
  }
  else {
    fs.appendFileSync("log.txt", "\nspotify-this-song: "+ song + "\n", 
      function(err) {
        if (err) {
          console.log(err);
        }
      });
  }

  const spotify = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
  });

  spotify
    .search({ type: 'track', query: song, limit: 5 })
    .then(function(response) {
      for (let itemIndex = 0; itemIndex < response.tracks.items.length; itemIndex++) {
        let artistsArray = [];
        for (let artistIndex = 0;
            artistIndex < response.tracks.items[itemIndex].artists.length;
            artistIndex++) {
          artistsArray.push(response.tracks.items[itemIndex].artists[artistIndex]
            .name);
        }
        logIt("Artist(s): " + artistsArray.join(", "));
        logIt("Album: "+response.tracks.items[itemIndex].album.name)
        logIt("Title: "+response.tracks.items[itemIndex].name);
        logIt("Preview: "+response.tracks.items[itemIndex].preview_url);
        if (response.tracks.items.length > 1 && itemIndex < response.tracks.items.length - 1) {
          logIt("----------");
        }
      }
    })
    .catch(function(err) {
      console.log(err);
  });
};

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
