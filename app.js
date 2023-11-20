const express = require('express');
const apiResponse = require("./helpers/apiResponse");
var apiRouter = require("./routes/api_router");

var cors = require('cors');

// DB connection
var MONGODB_URL = "mongodb://127.0.0.1:27017/PW2_DataBase";
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());



// Use the route handlers with their respective base paths
app.use("/api/", apiRouter);


// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});


// Use app.listen to specify the port and start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
