var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    expressSanitizer    = require('express-sanitizer')
    ;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());    
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.get('/', function (req, res) {
    res.render('homepage');
    });
    app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    });

