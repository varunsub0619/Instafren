const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  likes: { type: Array, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ body: String, date: Date }]
}, { timestamps: true});

const Post = mongoose.model('UserPost', postsSchema);
module.exports = Post;