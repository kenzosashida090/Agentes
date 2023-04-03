const express = require('express');

const app = express();
const reviews = require('./route/reviewRouter')
app.use((req,res,next) => {
    console.log('Hello from the middleware')
    next();
})

app.use('/api/',reviews );

module.exports = app