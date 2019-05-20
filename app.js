var express= require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencoderParser =  bodyParser.urlencoded({extended:false});

var app = express();

//session initialisation - param secret is require
app.use(session({secret: 'topsecret'}))

//Create a session with an empty array if it doesn't exist
.use(function(req, res, next){
  if(typeof(req.session.todolist) == 'undefined'){
    req.session.todolist = [];
  }
    next();
})

//Display the todolist and the form
.get('/todo', function(req, res){
  res.render('todo.ejs', {todolist: req.session.todolist});
})

//Add a new item to the todo list
.post('/todo/add/', urlencoderParser, function(req, res){
  if( req.session.newtodo != ''){
    req.session.todolist.push(req.body.newtodo);
  }
  res.redirect('/todo')
})

// Delete an item from the todo list
.get('/todo/delete/:id', function(req, res){
  if(req.params.id != ''){
    req.session.todolist.splice(req.params.id, 1);
  }
  res.redirect('/todo');
})

//return todo page for 404 page
.use(function(req, res, next){
  res.redirect('/todo');
})

.listen(8080);
