import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import auth from './routes/auth';

dotenv.config();
const app = express();
var dbURI = 'mongodb://localhost/bookworm';
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.on('connected' , function(){
    console.log('Mongoose connected to ' + dbURI) ;
});
  
app.use(bodyParser.json());

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, () => console.log('Running on localhost:8080'))