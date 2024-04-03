// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/public/index.html');

});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', async (req, res) => {
    // send the pets array as a response
    // use a try catch to find the pets and display them
    // Search the database to find all the pets
    // We need the found pets as a JSON response
    try {
        const pets = await pets.find();
        res.json(pets);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', async (req, res) => {
    // get the owner from the request
    const owner = req.query.owner;
    try{
        // find the pet in the pets array
        const pet = await pets.find(pet => pet.owner === owner);
        
        // send the pet as a response
        res.json(pet);
    } catch(error) {
        res.status(500).json({message:error.message});
    }
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;
    try{
        // find the pet in the pets array
        const pet = pets.find(pet => pet.name === name);
        
        // send the pet as a response
        res.json(pet);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;