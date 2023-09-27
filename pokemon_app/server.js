const express = require("express");
const app = express();
const port = 3001;
const mongoose = require('mongoose')
const jsxEngine = require("jsx-view-engine");
const methodOverride = require('method-override')
//import dotenv module to connect to your env file
const dotenv = require('dotenv')
//data
const Pokemon = require("./models/pokemon");
//ADDING OUR VIEW TEMPLATES
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once("open", ()=>{
  console.log('connected to mongo')
})
//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}))
app.use((req, res, next)=>{
    console.log('I run for all routes')
    next()
})

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});
//Index route
app.get("/pokemon", async(req, res) => {
  try{
  // res.send(pokemon)
  const pokemon = await Pokemon.find()
  res.render("Index", { pokemon: pokemon });
  }catch(error){
    console.error(error)
  }
});
//new- get the form to add a new pokemon
app.get("/pokemon/new", (req, res) => {
  res.render("New");
});
//delete
app.delete('/pokemon/:id', async(req, res)=>{
  try{
    await Pokemon.findByIdAndRemove(req.params.id)
    res.redirect('/pokemon')
  }catch(error){
    console.error(error)
  }
})
//update

//create
app.post('/pokemon', async(req, res)=>{
  try{
    // req.body.img = "http://img.pokemondb.net/artwork/"+ req.body.name.toLowerCase()
    await Pokemon.create(req.body)
    // pokemon.push(req.body)
    // console.log(pokemon)
    res.redirect('/pokemon')
  }catch(error){
    console.log(error)
  }
})
//show route
app.get("/pokemon/:id", async(req, res) => {
  try{
const pokemon = await Pokemon.findById(req.params.id)
 
  res.render("Show", { pokemon: pokemon });
  }catch(error){
    console.log(error)
  }
});

app.listen(3001, () => {
  console.log("listening");
});
