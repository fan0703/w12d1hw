const express = require("express");
const app = express();
const port = 3001;
const pokemon = require("./models/pokemon");
const jsxEngine = require("jsx-view-engine");

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

app.use(express.urlencoded({extended:false}))
app.use((req, res, next)=>{
    console.log('I run for all routes')
    next()
})

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", (req, res) => {
  // res.send(pokemon)
  res.render("Index", { pokemon: pokemon });
});

app.get("/pokemon/new", (req, res) => {
  res.render("New");
});

app.post('/pokemon', (req, res)=>{
    pokemon.push(req.body)
    console.log(pokemon)
    res.redirect('/pokemon')
})

app.get("/pokemon/:id", (req, res) => {
  res.render("Show", { pokemon: pokemon[req.params.id] });
});

app.listen(3001, () => {
  console.log("listening");
});
