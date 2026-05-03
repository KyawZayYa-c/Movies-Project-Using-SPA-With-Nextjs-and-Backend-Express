var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const {db} = require('./config/database');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const demoRouter = require('./routes/demo');
const adminRouter = require('./routes/admin');
const customLogger = require('./middleware/customLogger');
const adminAuth = require('./middleware/adminAuth');
const todoRouter = require('./routes/todos');
const moviesRouter = require('./routes/movie');
const reviewsRouter = require('./routes/review');
const userRouter = require('./routes/user');
const auth = require('./middleware/auth');
const mongoose = require("mongoose");
var app = express();

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(customLogger)
app.use(adminAuth);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demo',demoRouter);
app.use('/admin', adminRouter);
app.use('/api/todos', todoRouter);
app.use('/api/movies', auth.verifyToken, moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/users', auth.verifyToken, userRouter);

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

module.exports = app;
