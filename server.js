const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
// app.use(express.static(__dirname+'/public')); // help.html still executes

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (message) => {
    return message.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');

    // res.send({
    //     name: 'Andrew',
    //     likes: [
    //         'Biking',
    //         'Colouring'
    //     ]
    // });
    res.render('home.hbs', ({
        pageTitle: 'Home Page',
        welcomeMessage: 'Hey! Welcome to the Page',
        // currentYear: new Date().getFullYear()
    }));
});

app.get('/about', (req, res) => {
    // res.send('Hey this is the about page');
    res.render('about.hbs',({
        pageTitle: 'About page',
        // currentYear: new Date().getFullYear()
    }));
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad Request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
