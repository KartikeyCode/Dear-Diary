//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
var homeStartingContent = "";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = []
app.get("/",function(req,res){
  if(posts.length==0){
    homeStartingContent="Start writing your diary 📖🖋️"
  }
  else{
    homeStartingContent=""
  }
  res.render('home',{homeContent:homeStartingContent, posts:posts})
})

app.get("/contact",function(req,res){
  res.render('contact',{contact:contactContent})
})

app.get("/compose",function(req,res){
  res.render('compose')
})

app.post("/compose",function(req,res){
  let formdata = {
    title: req.body.title,
    post: req.body.post
  }
  posts.push(formdata)
  res.redirect("/")
})


app.get("/posts/:title",function(req,res){
  posts.forEach(function(object){
    if(_.lowerCase(req.params.title) === _.lowerCase(object.title) ){
      res.render('post',{postE:object,link:"/posts/"+_.lowerCase(object.title)})
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
