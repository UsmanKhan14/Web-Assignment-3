/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Usman Ali Student ID: 105451223 Date: 01/03/2024
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    // Fetch Lego data based on theme
    // Example: Fetch Lego sets with theme = theme
    // Replace the below code with your data retrieval logic
    res.send(`Fetching Lego sets for theme: ${theme}`);
  } else {
    // Fetch all unfiltered Lego data
    // Example: Fetch all Lego sets
    // Replace the below code with your data retrieval logic
    res.send('Fetching all Lego sets');
  }
});

app.get('/lego/sets/:set_num', (req, res) => {
  const set_num = req.params.set_num;
  // Fetch Lego set with set_num
  // Example: Fetch Lego set with set_num = set_num
  // Replace the below code with your data retrieval logic
  res.send(`Fetching Lego set with set_num: ${set_num}`);
});

// Custom 404 route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
