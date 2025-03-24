var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var authRouter = require('./routes/authrouters');
const blogrouter=require('./routes/blogrouters');
const adminrouter=require('./routes/adminrouters')
const hbs = require("hbs");
var db = require('./connect/db');
var app = express();


require('dotenv').config(); 









app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/auth'),path.join(__dirname,'views/blog'),path.join(__dirname, 'views/auth'),path.join(__dirname,'views/admin')]);


app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/',blogrouter);
app.use('/',adminrouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


hbs.registerHelper("eq", function (a, b) {
  return a === b;
});


app.use(express.static(path.join(__dirname, "public")));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((req, res, next) => {
  res.status(404).render("error", { message: "Page Not Found " });
});

db()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});


hbs.registerPartials(__dirname + "/views/partials");
 

module.exports = app;
