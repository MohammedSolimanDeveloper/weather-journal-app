// Setup empty JS Object to act as end point for all routes
let projectData = {};

/* Required Dependencies*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start an Instance of Express 
const app = express();


/* Middleware */
// Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Express To use Cors
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// POST route 
app.post('/add', addInfo);

function addInfo(req, res) {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/all', getInfo);

// Callback function to complete GET '/all'
function getInfo(req, res) {
    res.send(projectData);
}

// Declare a Port 
const port = 5968;

//Setup the Server and make it listen to the port
const server = app.listen(port, ()=> {
    console.log(`server is running and listening to port ${port}`);
});