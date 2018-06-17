const express = require('express');
const morgan = require('morgan');
const app = express();
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const keys=require('./config/key');
const port = process.env.port || 3000;
mongoose.connect(keys.MongoDB.dbURL,() => {
    console.log('connected MongoDB Online');
});
app.use(cookieSession({
    name:'',
    maxAge:60*60*1000, // one hour
    keys:[keys.Session.cookieKey]
}));
app.use(morgan('combined'));
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home',{
        user:req.user
    });
});
app.listen(port, () => {
    console.log('SERVER Listeing port ' + port + '...');
});