/**
 * Author: Kshitij Chaudhary
 * CNumber: C1234567
 * Description: CRUD Application using Node.js, Express, Mongoose, MongoDB, and PUG.
 */

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error:', err));



// Home Page (Add User)
app.get('/', (req, res) => {
  res.render('add');
});

// Add User (POST)
app.post('/add', async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/display');
  } catch (err) {
    res.status(500).send('Error adding user.');
  }
});

// Display Users
app.get('/display', async (req, res) => {
  const users = await User.find();
  res.render('display', { users });
});

// Update User Page
app.get('/update/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('update', { user });
});

// Update User (POST)
app.post('/update/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/display');
  } catch (err) {
    res.status(500).send('Error updating user.');
  }
});

// Delete User
app.post('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/display');
  } catch (err) {
    res.status(500).send('Error deleting user.');
  }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
