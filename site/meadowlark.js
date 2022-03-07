var express = require('express');
var app = express();

//set up handlebars view engine
//this creates a view engine and configures Express to use it by default
var handlebars = require('express3-handlebars')
  .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//set up static directory | pg 26
app.use(express.static(__dirname + '/public'))

//routes
app.get('/', function(req, res) {
    res.render('home')
});
app.get('/about', function(req, res) {
    let randomeFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomeFortune});
});

//custom 404 page
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + 
      app.get('port') + '; press Ctrl-C to terminate.');
});

//Dynamic content views example | pg 27
var fortunes = [
    "conquer your fears or they will conquer you.",
    "Rivers need springs",
    "Do not fear whad you don't know",
    "Whenever possible, keep it simple"
]