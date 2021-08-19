const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Setting up path for handlebars global dynamic pages and templating
const viewsPath = path.join(__dirname, '../templates/views')

//Setting up path for handlebars partials dynamic pages and templating
const partialsPath = path.join(__dirname, '../templates/partials')

//Initializing paths for handlebars pages and templating
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setting path to public folder for static web elements
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//Arg 1: extension, Arg 2: request and response (files w/ no extension use public/index.html)
//If extensions have html files in public, those can be used in the browser using the full filename (ex:help.html)

app.get('', (req, res) => {
  //Renders a dynamic hbs view in the views folder
  res.render('index', {
    title: 'Weather App',
    name: 'Michael'
  })
})

app.get('/about', (req, res) => {
  //Renders a dynamic hbs view in the views folder
  res.render('index', {
    title: 'About Me',
    message: 'This page is about me.',
    name: 'Michael'
  })
})

app.get('/help', (req, res) => {
  //Renders a dynamic hbs view in the views folder
  res.render('index', {
    title: 'Help Me',
    name: 'Michael',
    message: 'This is the help page!!!'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }

  geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    } else {
      forecast(latitude, longitude, location, (error, forecastData) => {
        if (error) {
          return res.send({error})
        }
        return res.send({
          forecastData,
          location,
          address: req.query.location})
      })
    }
  })
})

app.get('/help/*', (req, res) => {
  res.render('index', {
    title: '404 Error',
    message: 'The specified help article could not be found',
    name: 'Michael'
  })
})

app.get('*', (req, res) => {
  res.render('index', {
    title: '404 Error',
    message: 'The specified page could not be found',
    name: 'Michael'
  })
})

//Need a port to view in browser. This will only be available when running the code, not in the browser
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
