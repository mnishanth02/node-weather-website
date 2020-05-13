const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../src/utills/geocode');
const forecast = require('../src/utills/forecast');


const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    });
});

app.get('/weather', (req, res) => {

    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'Please provide a Location'
        });
    }

    if (!address) {
        console.log('pleae specify address');
    } else {
        geocode(address, (error, data) => {
            if (error) {
                return res.send({
                    error,
                    errorMessage: 'Please Try after some time'
                });
            }
            forecast(data, (error, { summary, location } = {}) => {
                if (error) {
                    return res.send({
                        error,
                        errorMessage: 'Error in getting Weather details, Please Try after some time'
                    });
                }
                res.send({
                    forecast: summary,
                    location,
                    address: req.query.address,
                });
            });
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});