/* This would typically be ignored by git, but needed for homework */
console.log("Keys and tokens are loaded.\n");

const twitterKeys = {
  consumer_key: '3RjiR6t1TcDl4g7IAW33RUAcO',
  consumer_secret: 'k6IAPEQS1nkMRayV61GP2rdbhfggnHGogbTRlP0NpVUBkcXX26',
  access_token_key: '1287169538-silym7Q2OnEIJlzjt93x6jr6wJc6ZHHhK5Mu7zq',
  access_token_secret: 'ZYLYcrNGqg1u3euJaI9I2ePO1LBBsCh1j61eWhJm6aSgz',
}

const spotifyKeys = {
  client_id: 'bc8bce2ea8d34b198b860da887bee2dd',
  client_secret: '6f5ea275eda344c1874b82f0308c5257'
}

module.exports = {
  twitterKeys: twitterKeys,
  spotifyKeys: spotifyKeys
};
