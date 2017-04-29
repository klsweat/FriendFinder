// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsTable = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friendsTable);
    });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;

    for(var i = 0; i < newFriend.scores.length; i++) {
			if(newFriend.scores[i] == "1 (Strongly Disagree)") {
				newFriend.scores[i] = 1;
			} else if(newFriend.scores[i] == "5 (Strongly Agree)") {
				newFriend.scores[i] = 5;
			} else {
				newFriend.scores[i] = parseInt(newFriend.scores[i]);
			}
		}

		var differencesArray = [];

		for(var i = 0; i < friendsTable.length; i++) {

			var comparedFriend = friendsTable[i];
			var totalDifference = 0;
			
			for(var k = 0; k < comparedFriend.scores.length; k++) {
				var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		}

		var bestFriendNum = differencesArray[0];
		var bestFriendIndex = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < bestFriendNum) {
				bestFriendNum = differencesArray[i];
				bestFriendIndex = i;
			}
		}

		friendsTable.push(newFriend);

		res.json(friendsTable[bestFriendIndex]);

	})
}