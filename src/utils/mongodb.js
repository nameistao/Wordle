//import npm modules
const {MongoClient, ObjectID} = require('mongodb');
const bcrypt = require('bcrypt');

//function for registering
const register = (email, password, callback) => {
    //set connectionURL and database name
    const databaseName = 'pomodororo';
    const connectionURL = 'mongodb+srv://tao:DoxmGsMXpm4sKeRq@cluster0.2fxjm.mongodb.net/my'+databaseName+'?retryWrites=true&w=majority';
    
    //connect to client
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if(error){
            callback('Unable to connect to database', undefined);
            return;
        }
        const db = client.db(databaseName);

        //check if user exists already
        db.collection('users').findOne({email: email}, (error, user) => {
            if(error) {
                callback('Unable to fetch', undefined);
                return;
            }
            
            //if user exists
            if(user !== null){
                callback('User exists already.',undefined);
                return;
            }
            //else add user
            else{
                //generate password using bcrypt
                bcrypt.hash(password, 10, function(err, pwHash) {
                     //add this new user to the database in the users collection
                    db.collection('users').insertOne({
                        email: email,
                        passwordHash: pwHash,
                        pomodoroTime: 25 * 60,
                        shortBreakTime: 5 * 60,
                        longBreakTime: 15 * 60,
                        tasks: []
                    }, (error, result) => {
                        if(error){
                            callback('unable to register user', undefined);
                            return;
                        }
                        else{
                            callback(undefined, 'registration successful');
                            return;
                        }
                    });
                });
            }
        })
    });
};

//function for login
const login = (email, password, callback) => {
    //set connectionURL and database name
    const databaseName = 'pomodororo';
    const connectionURL = 'mongodb+srv://tao:DoxmGsMXpm4sKeRq@cluster0.2fxjm.mongodb.net/my'+databaseName+'?retryWrites=true&w=majority';
    
    //connect to client
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if(error){
            callback('Unable to connect to database',undefined);
            return;
        }
        const db = client.db(databaseName);

        //check if user exists
        db.collection('users').findOne({email: email}, (error, user) => {
            if(error) {
                callback('Unable to fetch',undefined);
                return;
            }
            
            //if user exists, check if passwordHash matches
            //if so, send user data to front-end
            if(user !== null){

                //check if passwordHash matches
                bcrypt.compare(password, user.passwordHash, function(err, result) {
                    if(err){
                        callback('password comparison error', undefined);
                        return;
                    }
                    if(result === false){
                        callback('password does not match', undefined);
                        return;
                    }
                    //now pass user data to front-end
                    const userData = {
                        email: user.email,
                        pomodoroTime: user.pomodoroTime,
                        shortBreakTime: user.shortBreakTime,
                        longBreakTime: user.longBreakTime,
                        tasks: user.tasks
                    }
                    callback(undefined, userData);
                    return;
                });
            }
            //else tell front-end user doesn't exist
            else{
                //tell front-end user doesn't exist
                callback('user doesn\'t exist', undefined);
                return;
            }
        })
    });
};

//export module
module.exports = {
    register,
    login
};
