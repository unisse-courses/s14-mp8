const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

//Routes imports
const cartRouter = require('./routes/cartRoutes');
const productRouter = require('./routes/productRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const userRouter = require('./routes/userRoutes');
const indexRouter = require('./routes/index');

const port = 3000;
const app = express();

app.engine( 'hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
}));

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.listen(port, function() {
    console.log('App listening at port ' + port);
});

app.use(session({
  secret: 'somegibberishsecret',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use('/', userRouter);
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/menu', productRouter);
app.use('/history', transactionRouter);