

GitHub 
* Realtime application framework ( Node.JS server ) http://socket.io
[1. socket.io](https://github.com/socketio/socket.io) 

* WebSocket emulation - Javascript client http://sockjs.org
[2. sockjs-client](https://github.com/sockjs/sockjs-client.git)

* HTML5 Web Socket implementation powered by Flash
[3. web-socket-js](https://github.com/gimite/web-socket-js) 


websocket:
Sock.js(处理兼容性)
Stomp.js（处理传输协议）

-----

### sockjs-client
Development and testing
> SockJS-client needs node.js for running a test server
```
cd sockjs-client
npm install
```
> To generate JavaScript, run:
```
gulp browserify
```
> To generate minified JavaScript, run:
```
gulp browserify:min
```
上面两命令，都输出到 build/ 文件夹中。