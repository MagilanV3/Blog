const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

const { render } = require('express/lib/response');
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express();

const dbuRI = 'mongodb+srv://john:test@nodetuts.vfcpj.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbuRI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> app.listen(3000))
.catch((err) => console.log(err));



// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use('/blogs', blogRoutes);


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
