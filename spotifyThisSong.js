const fs = require("fs");
const logIt = require("./logIt");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

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

module.exports = spotifyThisSong;
