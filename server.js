/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Usman Ali Student ID: 105451223 Date: 
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/
const legoData = require("./modules/legoSets"); // Ensure this module exists
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from 'public' and set 'ejs' as the view engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/lego/sets', async (req, res) => {
  try {
    const theme = req.query.theme || 'all';
    const sets = theme !== 'all' ? await legoData.getSetsByTheme(theme) : await legoData.getAllSets();
    res.render('sets', { sets: sets, theme: theme });
  } catch (err) {
    res.status(404).render('404', { message: "Failed to load LEGO sets." });
  }
});


app.get('/lego/sets', async (req, res) => {
  try {
    const theme = req.query.theme || 'all';
    const sets = theme !== 'all' ? await legoData.getSetsByTheme(theme) : await legoData.getAllSets();
    if (sets.length === 0) {
      throw new Error(`No sets found for the theme: ${theme}`);
    }
    res.render('sets', { sets: sets, theme: theme });
  } catch (err) {
    res.status(404).render('404', { message: err.message });
  }
});




// Custom 404 route
app.use((req, res) => {
  res.status(404).render('404', { message: "The page you are looking for doesn't exist." });
});

// Initialize legoData and start server
legoData.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize data module:", err);
});
