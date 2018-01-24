const fs = require("fs");
const logIt = require("./logIt");
const Twitter = require("twitter");
const keys = require("./keys.js");

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
        logIt(`Created at ${tweets[index].created_at}` + "\n");
      }
    }
  });
};

module.exports = myTweets;
