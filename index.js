//jshint esversion:6
require('dotenv').config();
const pass = process.env.PASSWORD;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
var homeStartingContent = "";
const contactContent = "Welcome to my website I am Kartikey thank you lol bye! @wc.smile btw instagramphh boop beep bap bada bing bap pow.";

const app = express();
mongoose.connect('mongodb+srv://codekartikey:'+pass+'@clustertruck.wodlnem.mongodb.net/blogDB');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const diarySchema = new mongoose.Schema({
  title: String,
  content : String
})

const diaryEntries = mongoose.model('diaryEntries',diarySchema)



app.get("/",function(req,res){
  diaryEntries.find({}).exec().then(ent=>{

    if(ent.length==0){
      homeStartingContent="Start writing your diary 📖🖋️"
    }
    else{
      homeStartingContent=""
    }
    res.render('home',{homeContent:homeStartingContent, posts:ent})
  })
})

app.get("/contact",function(req,res){
  res.render('contact',{contact:contactContent})
})

app.get("/compose",function(req,res){
  res.render('compose')
})

app.post("/compose",function(req,res){
  
  const  titleE = req.body.title;
  const  post = req.body.post;
  const entry = new diaryEntries({
    title: titleE,
    content: post
  }) 
  entry.save();
  console.log(titleE + " Has been added!")
  res.redirect("/")
})


app.get("/posts/:title",function(req,res){
  diaryEntries.find({}).exec().then(ent=>{
    ent.forEach(object=>{
      if(_.lowerCase(req.params.title) === _.lowerCase(object.title) ){
        res.render('post',{postE:object,link:"/posts/"+_.lowerCase(object.title)})
      }
    })
    })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
