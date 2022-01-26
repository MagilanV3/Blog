const Blog = require('../models/blog');

const blog_index = (req,res) => {
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
      res.render('index',{title:'All Blogs', blogs: result})
    })
}
const blog_create = (req,res) => {
    res.render('create', { title: 'Create a new blog' });
}

const blog_post = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
      res.redirect('/blogs');
    })
}
const blog_get = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
      res.render('details', {blog: result, title: 'Blog Details'});
    })
}
const blog_delete = (req,res) => {
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
    .then(result =>{
      res.json({redirect:'/blogs'})
    })
}

module.exports = {
    blog_index,
    blog_create,
    blog_post,
    blog_get,
    blog_delete

}