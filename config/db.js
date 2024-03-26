const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://<username>:<password>@onesinus.wdkycn8.mongodb.net', {})
mongoose.connect('mongodb://localhost:27017', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;
