// "C" (Controller) part of the MVC Design Pattern

// Import the Blog format
const Blog = require('../models/blog');

// Home Page
const blog_index = (req,res) => {
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
      res.render('index',{title:'All Blogs', blogs: result})
    })
}

// "New Blog" Page 
const blog_create = (req,res) => {
    res.render('create', { title: 'Create a new blog' });
}

// Adding the Blog to the database when the "post" button is clicked
const blog_post = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
      res.redirect('/blogs');
    })
}

// Find a specfic Blog from the database
const blog_get = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
      res.render('details', {blog: result, title: 'Blog Details'});
    })
}

// Delete a blog when the button is pressed
const blog_delete = (req,res) => {
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
    .then(result =>{
      res.json({redirect:'/blogs'})
    })
}

// Prepare for the functions to be Exported
module.exports = {
    blog_index,
    blog_create,
    blog_post,
    blog_get,
    blog_delete

}