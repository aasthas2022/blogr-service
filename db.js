const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SampleBlogs');
mongoose.connection.on('error', (error) => {
  console.log('MongoDB Connection Error:', error);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected!');
});

