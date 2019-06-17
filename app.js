const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
  isAuth: true }));
app.use('/', require('./router/index'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function (err, req, res, next) {
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error', { message: err.message, error: err });
// });

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Сервер запущен на порте: ' + server.address().port);
});
