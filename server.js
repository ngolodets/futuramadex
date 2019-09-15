require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/client/build'));

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => {
  console.log(`💥💥💥 Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`);
});

app.use('/api', require('./routes/api'));

app.listen(process.env.PORT, () => {
  console.log(`💥💥💥 ... listening on port ${process.env.PORT} ... 💥💥💥`)
});