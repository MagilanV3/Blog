const express = require('express');
const BlogController = require('../controllers/BlogController')
const router = express.Router();

router.get('/create', BlogController.blog_create);
router.post('/', BlogController.blog_post);
router.get('/:id',BlogController.blog_get);
router.delete('/:id',BlogController.blog_delete);
router.get('/', BlogController.blog_index);

module.exports = router