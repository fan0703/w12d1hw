const express = require('express')
const app = express()
const port = 3001
const pokemon = require('./models/pokemon')
const jsxEngine = require('jsx-view-engine')

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

app.get('/', (req,res)=>{
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', (req, res)=>{
    // res.send(pokemon)
    res.render('Index', {pokemon: pokemon})
})
app.listen(3001,()=>{
    console.log("listening")
})