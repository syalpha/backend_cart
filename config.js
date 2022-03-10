const passport = require('passport');
const User = require('./model/User');

const GOOGLE_CLIENT_ID = '444253287324-ophqskdn9rv590flqn8ca02q0ij6a8eo.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({

        clientID: GOOGLE_CLIENT_ID,
        clientSECRET: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/auth/google/callback',
        passReqToCallback: true
    },
    async(accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile)
    }))
passport.serializeUser((user, done) => {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
});
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});