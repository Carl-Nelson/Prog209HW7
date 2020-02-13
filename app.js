var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

app.dataArray = [];
app.dataArray.push({id:"fakegame1",date:"1997",rating:5});
app.dataArray.push({id:"fakegame2",date:"1998",rating:2});
app.dataArray.push({id:"fakegame3",date:"1999",rating:4});
// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about', { 
        dataArray: app.dataArray
     });
});



// upLoadData page 
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2&date=1941
app.get('/uploadData', function(req, res) {
    let id = req.param('id');
    let date = req.param('date');
    let rating = req.param('rating');
    if(id != null){
        let aGame = {
            id: id,
            date: date,
            rating: rating
        }
    app.dataArray.push(aGame);

    }
    res.render('pages/uploadData', { 
        dataArray: app.dataArray
     });
  });



// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let error ={
        status: "this is real bad",
        stack: "somebody called somebody who called somebody"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: error,
        dataArray: app.dataArray
    });
});


// doing this in www bin file to make Azure happy
//app.listen(443);  // not setting port number in www.bin, simple to do here
//console.log('443 is the magic port');

module.exports = app;
