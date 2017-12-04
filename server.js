const express = require('express');
const app = express();
var path = require('path');

//app.use(express.static(path.join(__dirname + '/main.html')));
app.use(express.static(path.join(__dirname)));
app.set('port', 3000);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('app listening on port ' + port);
  });