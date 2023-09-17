const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sub_title: { type: String },
  content: { type: String, required: true },
  slug: { type: String, unique: true },
  tags: { type: [String] },
  created_date: { type: Date, default: Date.now },
  modified_date: { type: Date, default: Date.now },
  author: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    first_name: { type: String },
    last_name: { type: String },
    bio: { type: String },
    profile_pic_url: { type: String },
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
