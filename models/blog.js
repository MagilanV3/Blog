// "M" (Models) part of the MVC Design Pattern

// Tool used to design data in MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blog format used to save in the database
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type:String,
        required: true
    },
    body:{
        type: String,
        required:true
    }
},{timestamps:true});

// Export the blog format
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

