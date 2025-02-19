const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { message: 'Invalid email or password.' });
      }
      return done(null, user);
    });
  }
));
