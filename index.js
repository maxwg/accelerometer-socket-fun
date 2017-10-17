
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/accel', function(req, res){
    console.log("GET")
    res.header('X-FRAME-OPTIONS', 'ALLOW-FROM *');
    res.sendFile(__dirname + '/index.html');
});

app.get('/accel/control', function(req, res){
    console.log("GET")
    res.sendFile(__dirname + '/controller.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('accel', function (data) {
        socket.broadcast
            .emit("accel",data);
    });

});


http.listen(3000, function(){
    console.log('listening on *:3000');
});
    