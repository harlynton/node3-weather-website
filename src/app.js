const path = require('path')
const express = require('express')
const hbs =require('hbs')

//Utils:
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config:
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



//Setup Handlebars engine and views location:
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory:
app.use(express.static(publicDir))

//Routes:
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Me'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title:'About Me',
        name: 'Me Me Me'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help Page',
        paragraph: 'This is a paragraph text.',
        name: 'Me Me Me'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address.'
        })
    }
    geoCode(req.query.address,(error, {latitude, longitude, location} ={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, 'm', (error, forecastData ) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData.forecast,
                location:location,
                address: req.query.address
            })
        })
    })

})


//Error 404:
app.get('/about/*',(req,res) => {
    res.render('404',{
        title: 'Page not found!',
        paragraph:'The requested page does not exists.',
        name: 'Me Me Me'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Page not found!',
        paragraph:'The requested page does not exists.',
        name: 'Me Me Me'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 'Page not found!',
        paragraph:'The requested page does not exists.',
        name: 'Me Me Me'
    })
})

//Running the server:
app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})