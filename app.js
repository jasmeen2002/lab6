/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs')

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let myMovies = ['Inception', 'Spiderman', 'The dark Knight', 'Tenet']

app.get("/", (req, res) => res.render("pages/index", {movie_lst: myMovies}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  const formdata = req.body
  const movies = formdata.description
  myMovies = []
  myMovies = movies.split(',')
  res.render("pages/index", {movie_lst: myMovies});
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  myMovies = []
  let movie1 = req.query.movie1
  myMovies.push(movie1)
  let movie2 = req.query.movie2
  myMovies.push(movie2)
  res.render("pages/index", {movie_lst: myMovies});
});


const newOb  = []
app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movie = req.params.movieName
  const movieOb = {}
  fs.readFile('movieDescriptions.txt',"utf8", (err,data) =>{
    if(err){
      console.log(err)
    }
  
    lst  =data.split('\n')
    for (words of lst){
      const movie_desc = words.split(':')
      movieOb[movie_desc[0]] = movie_desc[1]
      

    }
   
    if (movie in movieOb){
        newOb.push(movie)
        newOb.push(movieOb[movie])
        res.render("pages/searchResult", {movie_lst: newOb});
        
    
      }
      else{
        res.send(`<h1> movie doesnot exist in database </h1>`)
      }
      
  })

});

app.listen(3001, () => {
  console.log("Server is running on port 3000 🚀");
});
