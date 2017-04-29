// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ROUTING
module.exports = function(app){
  // Basic route that sends the user first to the home
  app.get('/', function(req, res){
    //loads the main html page
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // ---------------------------------------------------------------------------
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
  });



};