import { Router } from 'express';
import { Post } from '../models/Post.js';

const postController = Router();

postController.get('/', async (req, res) => {
    const limit = Number(req.query.limit);

    try {
        let posts;

        if (!isNaN(limit) && limit > 0) {
            posts = await Post.find().sort({ updatedAt: -1 }).limit(limit);
        } else {
            posts = await Post.find();
        }

        res.json(posts);
    } catch (error) {
        console.log(error);
    }
});

postController.get('/:userId/userPosts', async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ 'owner._id': userId });
        res.json(posts)
    } catch (error) {
        console.log(error);
    }
});

postController.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: Object.values(error.errors)[0].message });
        }
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

postController.get('/:postId/details', async (req, res) => {
    const id = req.params.postId;
    const currentPost = await Post.findById(id);
    res.status(201).json(currentPost);
});

postController.post('/:postId/edit', async (req, res) => {
    const postData = req.body;
    const id = req.params.postId;
    const updatedPost = await Post.findByIdAndUpdate(id, postData);
    res.status(201).json(updatedPost);
});

postController.delete('/:postId', async (req, res) => {
    try {
        const id = req.params.postId;
        const deletedItem = await Post.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
});

postController.get('/:postId/comments', async (req, res) => {
    try {
        const id = req.params.postId;
        const post = await Post.findById(id).select('comments').lean();
        res.json(post.comments);
    } catch (error) {
        console.log(error);
    }
});

postController.post('/:postId/comments', async (req, res) => {
    try {
        const { avatar, username, text } = req.body;
        const id = req.params.postId;
        const updatedComment = await Post.findByIdAndUpdate(id, { $push: { comments: { avatar, username, text } } }, { new: true });
        res.status(201).json(updatedComment);
    } catch (error) {
        console.log(error);
    }
});

postController.post('/:postId/reaction', async (req, res) => {
    const { postId } = req.params;
    const { userId, reaction } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      if (reaction === 'like') {
        if (post.likes.includes(userId)) {
          post.likes.pull(userId);
        } else {
          post.likes.push(userId);
          post.dislikes.pull(userId);
        }
      } else if (reaction === 'dislike') {
        if (post.dislikes.includes(userId)) {
          post.dislikes.pull(userId);
        } else {
          post.dislikes.push(userId);
          post.likes.pull(userId);
        }
      }
  
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default postController;