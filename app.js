const history = require('connect-history-api-fallback')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var reviewsRouter = require('./routes/reviews');

var app = express();

//connect to mongo db
const mongoose = require('mongoose');
const config = process.env;
mongoose.connect('mongodb+srv://' + process.env.DB_USER  + ':' + process.env.DB_PW + '@sandbox-7vuqw.mongodb.net/' + process.env.DB_DBNAME + '?retryWrites=true&w=majority')
  .then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
  })
  .catch( (err) => console.error(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/reviews', reviewsRouter);

app.use(history({verbose: true}));

app.use(express.static(path.join(__dirname, "react_app", "build")))
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('*', (req5,res1) =>{
    res.sendFile(path.resolve(__dirname, "react_app", "build", "index.html"));
})

module.exports = app;
