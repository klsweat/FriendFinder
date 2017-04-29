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
    //holds key values that are submitted by client
    //holds the new object data submitted through form  
    var newMatch = req.body;

    //get the length of the scores array submitted
    for(var i = 0; i < newMatch.scores.length; i++) {
        //object scores with a string in it set a integer to the score key
		if(newMatch.scores[i] == "1 (Strongly Disagree)") {
			newMatch.scores[i] = 1;
		} else if(newMatch.scores[i] == "5 (Strongly Agree)") {
			newMatch.scores[i] = 5;
		} else {
			newMatch.scores[i] = parseInt(newMatch.scores[i]); //parse the score keys to make integers
		}
	}

    //create a array variable that will hold the difference in scores
	var scoreDifferences = [];
        //for loop for each array in the current friends object
		for(var i = 0; i < friendsTable.length; i++) {
            //create variable to hold current friends object
			var compareMatches = friendsTable[i];
            //create total variable to begin at 0
			var totalDiff = 0;
			
            //run a for loop using the friends.scores object array
			for(var k = 0; k < compareMatches.scores.length; k++) {
                //returns absolute value
				var diffScore = Math.abs(compareMatches.scores[k] - newMatch.scores[k]);
                //total diff equals different score
				totalDiff += diffScore;
			}
            //set scoreDifferences array equal tot he totalDiff
			scoreDifferences[i] = totalDiff;
		}

        //create variable equal to the scoreDifference[0] first index
		var matchScore = scoreDifferences[0];
        //create variable equal to 0
		var matchIndex = 0;

        //create a for loop 
		for(var i = 1; i < scoreDifferences.length; i++) {
            //if scoredifferences is less than matchscore
			if(scoreDifferences[i] < matchScore) {
                //set the matchscore eault to the scoreDiff
				matchScore = scoreDifferences[i];
				matchIndex = i;
			}
		}

        //push new object data to the friends object
		friendsTable.push(newMatch);

        //show the new object in the api
		res.json(friendsTable[matchIndex]);

	})
}