var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('build'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'build/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);