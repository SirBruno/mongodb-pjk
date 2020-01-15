const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

let User = require('./models/user.model');

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.get('/', (req, res) => {
  User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});

app.get('/add', (req, res) => {
  const newUser = new User({ username: req.query.username });
  newUser.save().then(() => res.json('User added!')).catch(err => res.status(400).json('Error: ' + err));
});

app.get('/delete', (req, res) => {
  User.findByIdAndDelete(req.query.id).then(
    () => res.json('User deleted.')
  ).catch(
    err => res.status(400).json('Error: ' + err)
  );
});

app.listen(5000, () => {
  console.log('running on http://localhost:5000');
});