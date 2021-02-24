const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  (email, password, done) => {
    User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Incorrect email' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect password' });
        return;
      }

      done(null, foundUser);
    })
    .catch(err => done(err));
  }
));
///////// NUEVA ESTRATEGIA DE GOOGLE
// Nueva estrategia: Google Strategy.

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    async (_, __, profile, callback) => {
      console.log("PROFILE: ", profile)
      // Tenemos que verificar si hay un usuario con ese googleID, Si existe, lo dejamos entrar, si no... lo creamos e iniciamos su sesion
      const user = await User.findOne({ googleID: profile.id })
      if (user) {
        return callback(null, user)
      }
      const newUser = await User.create({
        googleID: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      })
      return callback(null, newUser)
    }
  )
)