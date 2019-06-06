const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');           // Log all HTTP requests to the console
const app = express();
const checkJwt = require('express-jwt');
const mongoose = require('mongoose');
const path = require('path');
const pathToRegexp = require('path-to-regexp');

//let dbUrl = 'mongodb://localhost/hertingsQuestionsV1';
let dbUrl = 'mongodb+srv://admin:1234@cluster0-vhkho.mongodb.net/job_site?retryWrites=true&w=majority';

/****** Configuration *****/
app.use(bodyParser.json());                 // Make sure all json data is parsed
app.use(morgan('combined'));         // Log all requests to the console

const port = (process.env.PORT || 8080);

/*if (!process.env.JWT_SECRET) {
    console.error('You need to put a secret in the JWT_SECRET env variable!');
    process.exit(1);
}*/

/****** Middleware *****/

// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    }
    else {
        // move on
        next();
    }
});

// Regex to show specifik path
const getJob = pathToRegexp('/api/jobs/job/:id');

// Open paths that does not need login
let openPaths = [
    '/api/users/authenticate',
    '/api/users',
    '/api/categories',
    '/api/areas',
    '/api/jobs',
    getJob
];
// Validate the user using authentication
app.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path : openPaths})
);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});

/****** Routes ******/
let jobsRouter = require('./jobs_router')();
app.use('/api/jobs', jobsRouter);

let areasRouter = require('./areas_router')();
app.use('/api/areas', areasRouter);

let categoriesRouter = require('./categories_router')();
app.use('/api/categories', categoriesRouter);

let usersRouter = require('./users_router')();
app.use('/api/users', usersRouter);

/****** Error handling ******/
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send({msg: 'Something broke!'})
});

/****** Listen ******/
app.listen(port, () => console.log(`API running on port ${port}!`));

mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
    console.log('mongo db connection', err);
});

app.use(express.static(path.join(__dirname, '../build')));

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});