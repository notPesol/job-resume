const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// setup engine...
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// setup static file...
app.use(express.static(path.join(__dirname, '/public')));

// setup session...
const session = require('express-session');
app.use(session({
  secret: process.env.SECRET_SESSION || "secretMustSecretOK",
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    signed: true
  }
}));

// use connect-flash middleware
const flash = require('connect-flash');
app.use(flash());

// use method-override
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

// connect to Mongo Atlas
const { connectDatabase } = require('./utils/helper');
connectDatabase();

// routes
const adminRoute = require('./routes/admin');
const jobRoute = require('./routes/job');
const userRoute = require('./routes/user');

// use urlencoded...
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// use routes
app.use('/', jobRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);


// page not found handle
app.all('*', (req, res) => {
  res.status(404).send("Page not found")
})

// error handle
app.use((err, req, res, next) => {
  res.status(500).send(err);
  console.error(err);
})


app.listen(PORT, () => {
  console.log("App running on port:", PORT);
})