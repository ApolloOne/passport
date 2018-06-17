const passport =require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('./key');
const user=require('../model/user-model');

passport.serializeUser((user,done) => {
    done(null,user.id);
});
passport.deserializeUser((id,done) => {
    user.findById(id).then((user) => {
        done(null,user);
    });
});
passport.use(
    new GoogleStrategy({
        // options for the google strat
        clientID:keys.Google.ClientID,
        clientSecret:keys.Google.ClientSecret,
        CallbackURL:'/auth/google/redirect'
    },(accessToken,refreshToken,profile,done) => {
        // passport callback function
        console.log('passport callback function fired');
        // console.log(profile);
        // console.log(accessToken);
        // console.log(refreshToken);
        // check if user already exists in our DB
        user.findOne({googleId:profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('user is used');
            } else {
                new user({
                    username:profile.displayName,
                    googleId:profile.id
                }).exec()
                    .save()
                    .then((err,value) =>{
                        if(err){
                            return console.error(err);
                        }
                        return console.log('new value user '+value);
                    });
            }
        });
    })

);