var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    expressSanitizer    = require('express-sanitizer'),
    mongoose            = require("mongoose"),
    dotenv              = require('dotenv'),
    Contact             = require("./models/contact")
    ;
//Routes Requires
var contactRoutes       = require("./routes/contact");
// Load environment variables from .env file
require('dotenv').config();

//CONFIG
var dbUrl = process.env.DATABASEURL || "mongodb://localhost/sellprius";
mongoose.connect(dbUrl);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());    
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.get('/', function (req, res) {
    res.render('homepage');
    });

app.use("/contact", contactRoutes);

app.listen(process.env.PORT || 3000, function () {
console.log('Prius Site Started');
});

