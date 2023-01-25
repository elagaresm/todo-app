const express = require('express')
const app = express()
const path = require('path')
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const PORT = 3000;
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))
app.set(express.json())

const data = []

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    data ? res.render('home', { tasks: data })
    : res.render('home', {tasks: [undefined]})
})

app.post('/home', (req, res) => {
    const { text } = req.body
    data.push({ id:uuidv4(), text })
    res.redirect('/home')
})

app.delete('/home', (req, res) => {
    const { id } = req.body
    console.log(id)
    const task = data.find(ele => ele.id == id)
    data.splice(data.indexOf(task), 1)
    res.redirect('/home')
})

app.patch('/home', (req, res) => {
    const { id, updatedTask } = req.body
    const foundEntry = data.find(entry => entry.id == id)
    foundEntry.text = updatedTask
    res.redirect('/home')
})

app.use('/', (req, res) => {
    res.send('404 Not Found')
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port: ${PORT}`)
})
