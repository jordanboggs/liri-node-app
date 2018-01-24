const fs = require("fs");

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

module.exports = logIt;
