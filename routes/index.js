var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var morgan = require('morgan')
var nocache=require('nocache')
var cookieParser = require('cookie-parser');
var session = require('express-session')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(morgan('tiny'))
const app=express()

app.use(nocache())

router.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 50000 }
}))

router.get('/', function (req, res) {
  let user = req.session.user;
  console.log(user);
  if (user) { 
    res.render('main', { content: user.email })
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function (req, res) {
  res.render('login');
});



router.post('/check', (req, res) => {
  const user = {
    email: "susin@gmail.com",
    password: "pass"
  }
  if (req.body.email === user.email && req.body.password === user.password) {

    req.session.user = user; 
   
    res.redirect('/')
  } else {
   
    res.send("unauthorised user")
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})




module.exports = router;
