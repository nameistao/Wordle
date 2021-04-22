//core packages
const path = require('path');
//npm packages
const express = require('express');
const hbs = require('hbs');
//import custom packages
const mongodb = require('./app.js');

//express object and port
const app = express();
const port = process.env.PORT || 3000;

//paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../views');


//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);

//set up static directory
app.use(express.static(publicDirPath));

//routes
app.get('', (req, res) => {
    res.render('index');
});

//route for mongoDB stuff
app.get('/server', (req, res) => {
    console.log(req.query.mode);
    if(req.query.mode === 'login'){
        console.log(req.query.email);
        console.log(req.query.password);
    }
    else if(req.query.mode === 'register'){
        register(req.query.email, req.query.password);
    }
});

app.get('*', (req, res) => {
    res.render('index');
});

//listener
app.listen(port);