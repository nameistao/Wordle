//import core modules
const crypto = require('crypto');
//import npm modules
const {MongoClient, ObjectID} = require('mongodb');

//function for registering
const register = (email, password) => {
    //set connectionURL and database name
    const databaseName = 'pomodororo';
    const connectionURL = 'mongodb+srv://tao:DoxmGsMXpm4sKeRq@cluster0.2fxjm.mongodb.net/my'+databaseName+'?retryWrites=true&w=majority';
    
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if(error){
            return console.log('Unable to connect to database');
        }
        const db = client.db(databaseName);
    
        db.collection('users').insertOne({
            email: email,
            passwordHash: crypto.createHash('md5').update(password).digest('hex')
        }, (error, result) => {
            if(error){
                return console.log('unable to register user');
            }
            
            console.log(result.ops);
        });
    });
};

module.exports = {
    register
};
