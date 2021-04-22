//import core modules
const crypto = require('crypto');
//import npm modules
const {MongoClient, ObjectID} = require('mongodb');

//function for registering
const register = (email, password) => {
    //set connectionURL and database name
    const databaseName = 'pomodororo';
    const connectionURL = 'mongodb+srv://tao:DoxmGsMXpm4sKeRq@cluster0.2fxjm.mongodb.net/my'+databaseName+'?retryWrites=true&w=majority';
    
    //connect to client
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if(error){
            return console.log('Unable to connect to database');
        }
        const db = client.db(databaseName);

        //check if user exists already
        db.collection('users').findOne({email: email}, (error, user) => {
            if(error) {
                return console.log('Unable to fetch');
            }
            
            //if user exists
            if(user !== null){
                return console.log('User exists already.');
            }
            //else add user
            else{
                //add this new user to the database in the users collection
                db.collection('users').insertOne({
                    email: email,
                    passwordHash: crypto.createHash('md5').update(password).digest('hex'),
                    pomodoroTime: 25,
                    shortBreakTime: 5,
                    longBreakTime: 15,
                    tasks: []
                }, (error, result) => {
                    if(error){
                        return console.log('unable to register user');
                    }
                    
                    console.log(result.ops);
                });
            }
            console.log(user);
        })
    });
};

module.exports = {
    register
};
