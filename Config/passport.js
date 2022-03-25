const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const SocialUser = require('../model/SocialUser')

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:5000/api/auth/google/callback`,
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const newSocialUser = {

                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.firstName,
                lastName: profile.lastName,
                image: profile.photos[0].value
            }
            try {
                let socialUser = await SocialUser.findOne({ googleId: profile.id });

                if (socialUser) {

                    done(null, socialUser)

                } else {
                    socialUser = await SocialUser.create(newSocialUser)
                    done(null, socialUser)
                }
            } catch (error) {
                console.error(error)
            }
        }))


    passport.serializeUser((socialUser, done) => {
        done(null, socialUser.id);
        // where is this user.id going? Are we supposed to access this anywhere?
    });
    passport.deserializeUser((id, socialUser) => {
        SocialUser.findById(id, function(err, socialUser) {
            done(err, socialUser);
        });
    });
}