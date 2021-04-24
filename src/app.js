//core packages
const path = require('path');
//npm packages
const express = require('express');
const hbs = require('hbs');
//import custom packages
const mongodbUtils = require('./utils/mongodb');

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
    //for logging in
    if(req.query.mode === 'login'){
        mongodbUtils.login(req.query.email, req.query.password, (error, userData) => {
            if(error){
                res.send({error});
            }
            //if successfully logged in, pass email, times, and tasks back to front-end js
            else{
                res.send(userData);
            }
        });
    }
    //for registering
    else if(req.query.mode === 'register'){
        mongodbUtils.register(req.query.email, req.query.password, (error, data) => {
            if(error){
                res.send({error});
            }
            else{
                res.send({data});
            }
        });
    }
    //for updating timers
    else if(req.query.mode === 'updateTimers'){
        mongodbUtils.updateTimers(req.query.email, req.query.pomodoroTime, req.query.shortBreakTime, req.query.longBreakTime, (error, data) => {
            if(error){
                res.send({error});
            }
            else{
                res.send({data});
            }
        });
    }
    else if(req.query.mode === 'updateTasks'){
        mongodbUtils.updateTasks(req.query.email, req.query.tasksText, (error, data) => {
            if(error){
                res.send({error});
            }
            else{
                res.send({data});
            }
        });
    }
});

//every other route gets routed to index.hbs
app.get('*', (req, res) => {
    res.render('index');
});

//listener
app.listen(port);