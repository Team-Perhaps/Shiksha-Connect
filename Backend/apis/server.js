const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors'); 
// const multer = require('multer');


app.use(bodyParser.json());
app.use(cors());
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());

mongoose.connect('mongodb+srv://abc:123@cluster0.ycvn278.mongodb.net/ShikshaConnect?', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const forumPostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    name: {type: String, required: true},
    postUpvotes: {type: Number, default: 0},
    postComments: {type: Number, default: 0},
    imageUrl: {type: String},
    upvotedBy: {type: [String], default: []},
  });
  
const ForumPost = mongoose.model('ForumPost', forumPostSchema);

app.post('/api/posts', async (req, res) => {
    const { userId, title, content, name, imageUrl, postComments, postUpvotes } = req.body;
  
    // Create a new ForumPost document
    const newPost = new ForumPost({ userId, title, content, name, postComments, postUpvotes });
    console.log(newPost);
    try {
      // Save the post to the database
      await newPost.save();
      res.status(201).send('Post saved successfully');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error saving the post to the database');
    }
  });
  
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await ForumPost.find({});
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error fetching forum posts');
    }
  });
  
  //Upvote API
  app.post('/api/posts/:postId/upvote', async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
    
    try {
      const post = await ForumPost.findById(postId);
    
      if (!post) {
        console.log("Bruh")
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (post.upvotedBy.includes(userId)) {
        console.log("bruh pt. 2")
        return res.status(400).json({ error: 'Already upvoted the post' });
      }
      
      // post.upvotedBy.push(userId);
      // post.postUpvotes++;
      // await post.save();
  
      const ans = await ForumPost.updateOne({_id: postId}, {postUpvotes: post.postUpvotes+ 1,})
      console.log(ans)
      return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error upvoting the post' });
    }
  });
  
  //Image Upload API
  // const storage = multer.diskStorage({
  //   destination: function(req, file, cb) {
  //     cb(null, 'uploads/');
  //   },
  //   filename: function(req, file, cb) {
  //     cb(null, file.originalname);
  //   }
  // });

  // const upload = multer({ storage: storage });

  // app.post('/api/upload-image', upload.single('image'), (req, res) => {
  //   const imageUrl = req.file.path;
  //   return res.status(201).json({ imageUrl });
  // });

  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
