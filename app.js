const express = require('express');
const morgan = require('morgan');
const app = express();
const authRoutes=require('./routes/auth-routes');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./config/key');
const port = process.env.port || 3000;
mongoose.connect(keys.MongoDB.dbURL,() => {
    console.log('connected MongoDB Online');
});
app.use(morgan('combined'));
app.use('/auth',authRoutes);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home');
});
app.listen(port, () => {
    console.log('SERVER Listeing port ' + port + '...');
});