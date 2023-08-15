// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();

const PORT = 3000;

//Serve the files in the "public" directory as static files
app.use(express.static("public"));

// GET - / - returns homepage
app.get("/", (req, res) => {
  // serve up the public folder as static index.html file
  res.sendFile(__dirname + "/public/index.html");
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  // send the pets array as a response
  res.json(pets);
});

// get pet by owner with query string
app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the request
  const owner = req.query.owner;
  // find the pet in the pets array
  const pet = pets.find((pet) => pet.owner === owner);
  if (pet) {
    // send the pet as a response
    res.json(pet);
  } else {
    // send an error response if pet is not found
    res.status(404).json({ Error: "Pet not found for the specified onwer." });
  }
});

// get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  const name = req.params.name;
  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name === name);
  if (pet) {
    // send the pet as a response
    res.json(pet);
  } else {
    res.status(404).json({ Error: "No pet found by specified name" });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;
