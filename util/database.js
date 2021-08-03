const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://arnobkumarsaha:sustcse16@cluster0.nj6lk.mongodb.net/myDatabase?retryWrites=true&w=majority";
let _db;
/*
const mongoConnect = (callback) =>{

    MongoClient.connect(
        'mongodb+srv://arnobkumarsaha:sustcse16@cluster0.nj6lk.mongodb.net/myDatabase?retryWrites=true&w=majority'
    ).then( (client)=>{
        console.log("MongoDB connected !");
        _db = client.db();
        callback();
    }).catch( (err)=>{
        console.log(err);
        throw err;
    });
}*/

const mongoConnect = (req, res, next) => {
    mongoose.connect(
        MONGODB_URI,
        {
        useUnifiedTopology: true,
        useNewUrlParser: true
        }
    ).then(result => {
        next();
    })
    .catch(err => console.log(err));
}


const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No Database found.'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;