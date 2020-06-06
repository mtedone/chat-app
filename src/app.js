const express = require('express');
const path = require('path');

const app = express();

//app.use(express.json()); // Order matters. This must come before the routers or body JSON payloads will be null


// Tells Express where to serve the static content from 
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

module.exports = app ;