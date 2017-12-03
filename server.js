const express = require('express');
const app = express();
var path = require('path');

//app.use(express.static(path.join(__dirname + '/main.html')));
app.use(express.static(path.join(__dirname + '/drawApp/drawApp.js')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/main.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));