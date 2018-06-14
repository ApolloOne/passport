const express = require('express');
const morgan = require('morgan');
const app = express();
const authRoutes=require('./routes/auth-routes');
const port = process.env.port || 3000;
app.use(morgan('combined'));
app.use('/auth',authRoutes);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home');
});
app.listen(port, () => {
    console.log('SERVER Listeing port ' + port + '...');
});