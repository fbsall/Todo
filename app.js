var require('express');
var require('cookie-session');
var require('body-parser');
var urlencoderParser =  require(bodyParser.urlencoded({extended: false});

var app = express();

//session initialisation - param secret is require
app.use(session({secret: 'topsecret'}));

//Create a session with an empty array if it doesn't exist
.use(function(res, req, next){
  if(typeof(req.session.todolist) == 'undefined'){
    req.session.todolist = [];
    next();
});

//Display the todolist and the form
.get('/todo', function(res, req){
  res.render('todo.ejs', {todolist: req.session.todolist});
});
