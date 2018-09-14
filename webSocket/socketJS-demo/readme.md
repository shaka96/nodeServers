[web-socket-js](https://www.bootcdn.cn/web-socket-js/)
HTML5 Web Socket implementation powered by Flash.
<script src="https://cdn.bootcss.com/web-socket-js/1.0.0/web_socket.js"> </script>

<script src="https://cdn.bootcss.com/web-socket-js/1.0.0/web_socket.min.js"> </script>

<!-- <script src="https://cdn.bootcss.com/web-socket-js/1.0.0/WebSocketMain.swf"> </script> -->

https://cdn.bootcss.com/web-socket-js/1.0.0/WebSocketMain.swf


> WebSocket API 使用很简单，通过WebSocket()构建函数创建一个套接字：
```
    var socket = new WebSocket("ws://ws.example.com:1234/resource");
```
    WebSocket()构造函数的参数是一个URL，
*   该URL使用ws://协议（或安全连接的 wss://协议）。
    该URL指定要连接的主机，还可指定端口（WebSocket使用和HTTP/HTTPS一样的默认端口）
    和路径/资源。
*   创建套接字后，通常需要在上面注册一个事件处理程序：
```
    socket.onopen = function(e){ //套接字已连接 };
    socket.onclose = function(e){ //套接字已关闭 };
    socket.onerror = function(e){ //出错了
        var message = e.data;   //服务器发送一条消息
    };
```    
*   为通过套接字发送数据给服务器， 可调用套接字的send()方法:
    socket.send("Hello, server！");
    通过调用close()方法来关闭WebSocket。
*   每个基于WebSocket的服务都要定义自己的"子协议",用于客户端和服务器端传输数据。
 
### fs模块
 socketJS-demo\utils\getFiles.js
 [getFiles.js](https://blog.csdn.net/qq_36245035/article/details/81070081)

### express模块
 socketJS-demo\express\app.js
 [app.js](https://blog.csdn.net/ZHQ_CSDN_Code/article/details/52903426) 