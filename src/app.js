//core packages
const path = require('path');
//npm packages
const express = require('express');
const hbs = require('hbs');

//express object
const app = express();

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

//listener
app.listen(3000);