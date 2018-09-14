//websocket.js
/*  运行在NodeJS上的服务器端JS。
    在HTTP服务器上，它运行一个WebSocket服务器，
    该服务器来自https://github.com/miksago/node-websocket-server/ 的第三方WebSocket库实现。
    若得到“/”的一个HTTP请求，则返回聊天客户端的HTML文件。
    除此之外任何HTTP请求都返回404.
    通过WebSocket协议接收到的消息都仅广播给所有激活状态的连接。
*/
var http = require('http');  //使用Node的HTTP服务器API
// var ws = require('websocket-server');   //使用第三方WebSocket库
var ws = require('nodejs-websocket');
var path = require('path');


//启动阶段，读取聊天客户端的资源文件  F:\AryanCode\items\nodeServers\webSocket\socketJS-demo\client\wschatclient.html
var filePath = path.join(__dirname, '../client/wschatclient.html');
console.log('filePath:',filePath);

var clientui = require('fs').readFileSync("../client/wschatclient.html");
    console.log('clientui:', clientui);
//创建一个HTTP服务器
var httpserver = new http.Server();

//当HTTP服务器获得一个新请求时，运行此函数
httpserver.on("request", function (request, response){
    //若请求“/”， 则返回客户端聊天UI
    if (request.url == "/") {    //请求聊天UI
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(clientui);
        response.end();
    } else {  //对任何其他的请求返回404“无法找到”编码
        response.writeHead(404);
        response.end();
    }
});
//在HTTP服务器上包装一个WebSocket服务器
var wsserver = ws.createServer({server: httpserver});
//当接收到一个新的连接请求的时候，调用此函数。
wsserver.on("connection", function(socket){
    socket.send("Welcome to the chat room.")    //向新客户端打招呼
    socket.on("message", function(msg){ //监听来自客户端的消息
        wsserver.broadcast(msg);        //并将它们广播给每个人
    });
});

/* 在8000端口运行服务器。
启动Websocket服务器的时候，也会启动HTTP服务器连接到 http://localhost:8000/ ， 
并开始使用它。 */
 wsserver.listen(8000);