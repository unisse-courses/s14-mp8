const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('./models/connection');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const {envPort, sessionKey} = require('./config.js');


const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

const moment = require('moment');

//Routes imports
const cartRouter = require('./routes/cartRoutes');
const productRouter = require('./routes/productRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const userRouter = require('./routes/userRoutes');
const indexRouter = require('./routes/index');

const port = envPort || 3000;
const app = express();

app.engine( 'hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  helpers: {
       section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
  },
    handlebars : allowInsecurePrototypeAccess(handlebars),
}));

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/img'));
//app.use(express.static(__dirname + '/scripts'));

app.listen(port, function() {
    console.log('App listening at port ' + port);
});

app.use(session({
  secret: sessionKey,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 1 }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/menu', productRouter);
app.use('/login', userRouter);
app.use('/profile', userRouter);
app.use('/cart', cartRouter);
//app.use('/admin', adminRouter);
//app.use('/admin', productRouter);