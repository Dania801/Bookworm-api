import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import auth from './routes/auth';
import signup from './routes/signup';
import confirm from './routes/confirm';
import books from './routes/books';

const app = express();
var dbURI = 'mongodb://localhost:27017/bookworm';
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.on('connected' , function(){
    console.log('Mongoose connected to ' + dbURI) ;
});
mongoose.connection.on('error' , function(err){
    console.log('Mongoose connection error: ' + err) ;
  });
  
  mongoose.connection.on('disconnected' , function(){
    console.log('Mongoose disconnected') ;
  });
  
  
app.use(bodyParser.json());

app.use('/api/auth', auth);
app.use('/api/signup', signup);
app.use('/api/auth/confirmation', confirm);
app.use('/api/books', books);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, () => console.log('Running on localhost:8080'))