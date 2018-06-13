const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.port || 3000;
app.use(morgan('combined'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(port, () => {
    console.log('SERVER Listeing port ' + port + '...');
});