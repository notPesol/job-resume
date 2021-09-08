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

const { connectDatabase } = require('./utils/helper');
// connect Mongo Atlas
connectDatabase();

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log("App running on port:", PORT);
})