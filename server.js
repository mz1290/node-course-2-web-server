// ===========================
// 3RD PARTY MODULE STUFF
// ===========================

const express   = require('express');
const hbs       = require('hbs');
const fs        = require('fs');

// ============================
// END 3RD PARTY MODULE STUFF
// ============================

// dynamically sets heroku port OR default to localhost 3000
const port  = process.env.PORT || 3000;
let app     = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// ================
// MIDDLEWARE STUFF
// ================

// app.use is how to create middleware
// next argument is used to tell Express that middleware is done
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log');
        }
    });
    next();
});

// this defaults all routes to maintenance during work
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// ================
// END MIDDLEWARE
// ================

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this testing space!',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});