// Requiring our models and passport as we've configured it
const passport = require('../passport');
// Import the model (user.js) to use its database functions.
const db = require('../../models');
// Requiring path to so we can use relative routes to our HTML files
const path = require('path');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../middleware/isAuthenticated');

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the home page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the home page
    if (req.user) {
      res.redirect('/home');
    } else {
      res.render(path.join(__dirname, '../../views/login.handlebars'));
    };
  });

  app.get('/', (req, res) => {
    // If the user already has an account send them to the home page
    if (req.user) {
      res.redirect('/home');
    }
    res.render(path.join(__dirname, '/views/index.handlebars'));
  });
};