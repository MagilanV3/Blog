// Import modules and functions from thrid-party application and local files
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

const { render } = require('express/lib/response');
const blogRoutes = require('./routes/blogRoutes')


// Intialize an express app
const app = express();

// Connect to the Mongodb database
const dbuRI = 'mongodb+srv://<username>:<password>@nodetuts.vfcpj.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbuRI, {useNewUrlParser: true, useUnifiedTopology: true})

// Start the localhost
.then((result)=> app.listen(5000))

// Check for any error with localhost startup
.catch((err) => console.log(err));

// Using Dev from the morgan middleware to log the time for requests
app.use(morgan('dev'));

// Registering an Ejs template engine with Express
app.set('view engine', 'ejs');

// Using any static files located in the public folder (styles.css) 
app.use(express.static('public'));

// Middleware Files
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Use the Blog Routes script when the home page is accessed
app.use('/blogs', blogRoutes);

// When trying to access "localhost:5000/" redirect to "localhost:5000/blogs"
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
