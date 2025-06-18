const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
app.use(express.static(path.join(__dirname, 'public')));


console.log(__dirname)
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../hafta9calismalari/templates/views')
const partialsPath = path.join(__dirname,'../hafta9calismalari/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))


app.listen(3000,  ()=>{
    console.log('server is up on port 3000')
})

app.get('', (req,res) => {
    res.render('index' , {
        title: 'WeatherApp HBS',
        name: 'User'
    }) 
})

app.get('/about', (req,res) => {
    res.render('about' , {
        title: 'About WeatherApp HBS About',
        name: 'User'
    }) 
})

app.get('/help', (req,res) => {
    res.render('help' , {
        title: 'Help WeatherApp HBS Heelp',
        name: 'User'
    }) 
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Arama terimi giriniz'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                latitude,
                longitude,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

/*
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Arama terimi giriniz'
        })
    }
    res.send( {
        title: 'Hava Durumu WeatherApp HBS',
        name: 'User',
        location: 'Istanbul',
        forecast: 'Güneşli',
        address: req.query.address
    }) 
})
*/
app.get('/products', (req,res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'Arama terimi giriniz'
        })
    }
        
    console.log(req.query.search)
    res.send({
        products: []
    })
})
//tüm hataları tek bir çatı altında birleştirip error sayfası oluşturduk
app.get('*splat', (req,res) => {
    res.render('error', {
        title: '404 Not Found!',
        name: 'User',
        errorMessage: '404 sayfa bulunamadı'
    })
})

// Help sayfası altındaki hatalar için özel 404 sayfası
app.get('/help/*splat', (req, res) => {
    res.render('error', {
        title: '404 Not Found!',
        name: 'User',
        errorMessage: '404 help alt sayfası sayfa bulunamadı'
    })
  });
  
  
/*
*/