## socketJS-demo

[web-socket-js](https://www.bootcdn.cn/web-socket-js/)
> HTML5 Web Socket implementation powered by Flash.
### source:
1. https://cdn.bootcss.com/web-socket-js/1.0.0/web_socket.js

2. https://cdn.bootcss.com/web-socket-js/1.0.0/web_socket.min.js

<!-- <script src="https://cdn.bootcss.com/web-socket-js/1.0.0/WebSocketMain.swf"> </script> -->

3. https://cdn.bootcss.com/web-socket-js/1.0.0/WebSocketMain.swf


### WebSocket API 
使用很简单，通过WebSocket()构建函数创建一个套接字：
```
    var socket = new WebSocket("ws://ws.example.com:1234/resource");
```

> WebSocket()构造函数的参数是一个URL，
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
```
    socket.send("Hello, server！");
```
    通过调用close()方法来关闭WebSocket。
*   每个基于WebSocket的服务都要定义自己的"子协议",用于客户端和服务器端传输数据。

#### WebSocket close事件
WebSocket API是纯事件驱动的。   
> 用addEventListener() DOM方法为WebSocket对象添加事件监听器。 

[WebSocket的事件触发机制](https://blog.csdn.net/ll666634/article/details/79028930)   
   
WebSocket对象调度4个不同的事件： open, message, error, close    
1. open 事件,一旦服务器响应了WebSocket连接请求，open事件触发并建立一个连接。对应的回调函数称作onopen。
> Event handler for the WebSocket connection opening   
```
    ws.onopen = function(e){
        console.log("Connection open ...");
    }
``` 
2. message事件, 在接收到消息时触发，对应于该事件的回调函数是onmessage。
> Event handler for receiving text messages    
```
    ws.onmessage = function(e){
        if(typeof e.data === "string"){
            console.log("String message recevied", e, e.data);
        }
    }
``` 
> Set binaryType to blob(Blob is default.)    
```
    ws.binaryType = "blob"; 
    //Event handler for receiving blob messages
    ws.onmessage = function(e){
        if( e.data instanceof Blob){
            console.log("Blob message recevied", e.data);
            var blob = new Blob(e.data);
        }
    }
``` 
> Set binaryType to ArrayBuffer message   
``` 
    ws.binaryType = "arrayBuffer"; 
    //Event handler for receiving ArrayBuffer messages
    ws.onmessage = function(e){
        if( e.data instanceof ArrayBuffer){
            console.log("ArrayBuffer message recevied" + e.data);
            // e.data is an ArrayBuffer. Create a byte view of that object.
            var a = new Unit8Array(e.data);
        }
    }
```
3. error 事件, 在响应意外故障的时候触发。与该事件对应的回调函数为onerror。错误还会导致WebSocket连接关闭。
> Event handler for errors in the WebSocket object   
```
    ws.onerror = function(e){
        console.log("WebSocket Error:", e);
        handleErrors(e);    //Custom function for handling errors
    }
``` 
4. close事件在WebSocket连接关闭时触发。对应于close事件的回调函数是onclose。 一旦连接关闭，客户端和服务器不再能接收或者发送消息。


> 在连接关闭时触发，这可能有多种原因，比如连接失败或者成功的WebSocket关闭握手。

WebSocket对象特性readyState反映了连接的状态（2为正在关闭，3为已关闭）。
* close事件有3个有用的属性（property），可以用于错误处理和恢复：wasClean、code和error。
* wasClean属性是一个布尔属性，表示连接是否顺利关闭。    
    A. 如果WebSocket的关闭是对来自服务器的一个close帧的响应，则该属性为true。   
    B. 如果连接是因为其他原因（例如，因为底层TCP连接关闭）关闭，则该属性为false。   
* code和reason属性表示服务器发送的关闭握手状态。

### Comet 
[cometClient.js]()  

    Comet是Alex Russell发明的词，指：一种更高级的Ajax 技术（服务器推送）。
    Ajax是一种从页面向服务器请求数据的技术，而Comet是一种服务器向页面推送数据的技术。
#### 实现Comet的方式：长轮询&流。
* 长轮询：是传统轮询（短轮询）的翻版，即，浏览器定时向服务器发送请求，看有无更新的数据。
    轮询的优势：是所有浏览器所支持。 XHR对象和 setTimeout()就能实现。
* HTTP流：不同于轮询，它在页面的整个生命周期内，只使用了一个HTTP连接。


### fs模块
 [socketJS-demo\utils\getFiles.js](https://github.com/shaka96/nodeServers/blob/master/webSocket/socketJS-demo/utils/getFiles.js)
 1. [node获取任意文件的路径](https://blog.csdn.net/qq_36245035/article/details/81070081)

### express模块
 [socketJS-demo\express\app.js](https://github.com/shaka96/nodeServers/blob/master/webSocket/socketJS-demo/express/app.js)

 2. [Node.js项目目录文件介绍](https://blog.csdn.net/ZHQ_CSDN_Code/article/details/52903426) 

 
 ### 实现一个websocket服务器
 [MDN: Writing WebSocket servers -译文](https://juejin.im/post/5a05d89051882540f36305df)
 websocket服务器的本质:
> WebSocket 服务器简单来说就是一个遵循特殊协议监听服务器任意端口的tcp应用。
> 可以使用任意的服务端编程语言来实现，只要该语言能实现基本的Berkeley sockets（伯克利套接字）。例如c(++)、Python、PHP、服务端JavaScript(node.js)。
#### 客户端握手请求
客户端仍然需要发起一个Websocket握手过程，服务器因此知道如何解析客户端的请求。
客户端将会发送一个标准的HTTP请求，如下例(HTTP版本必须1.1及以上，请求方式为GET)：
```
    GET /chat HTTP/1.1
    Host: example.com:8000
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
    Sec-WebSocket-Version: 13
```
> 此处客户端可以发起扩展或者子协议，在Miscellaneous查看更多细节。
> * 同样，公共的headers像User-Agent, Referer, Cookie, or authentication等同样可以包括，一句话做你想做的。
> 如果有的header不被识别或者有非法值，服务器应该发送'400 Bad Request'并立刻关闭socket，通常也会在HTTP返回体中给出握手失败的原因，这些信息可能不会被(浏览器)展示。
> * 如果服务器不识别WebSockets的版本，应该返回一个Sec-WebSocket-Version 消息头，指明可以接受的版本(最好是V13,及最新)。

#### 服务器握手返回
 当服务器接受到请求时，应该发送一个相当奇怪的响应，不过仍然遵循HTTP规范。
* 每一个header以\r\n结尾并且在最后一个后面加入额外的\r\n。
```
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```
> Sec-WebSocket-Accept 部分很有趣，服务器必须基于客户端请求的Sec-WebSocket-Key 中得到它，具体做法如下：
> 将Sec-WebSocket-Key 和"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"链接，通过SHA-1 hash获得结果，然后返回该结果的base64编码。
* 服务器在回复握手之前，可以发送其他的header像Set-Cookie、要求签名、重定向等。

 3. [编写 WebSocket 服务器](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
 #### 解码有效载荷长度
    必须知道何时停止读取。请遵循以下步骤:
* 读取9-15(包括)位并将其解析为无符号整型。
    a. 如果长度小于等于125，那么就是长度;你就完成了。
    b. 如果是126，到第二步。如果是127，到步骤3。
* 读取下面的16位，并将其解释为无符号整型。你就完成了。
* 读取接下来的64位，并将其解释为无符号整型(最重要的位必须为0)。
 #### 读取和解密数据
    如果设置了掩码位(对于客户机到服务器的消息应该是这样)，则读取接下来的4个字节(32位);这是掩蔽键。
> 一旦有效负载长度和掩蔽键被解码，您就可以继续从套接字读取字节数。 让我们调用已编码的数据和密钥掩码。
> 要获得解码，可以通过编码的八位元(字节，即文本数据的字符)和XOR八位元(i模4)掩码的第四个八位元进行循环。
在伪代码中(恰好是有效的JavaScript):
```
var DECODED = "";
for (var i = 0; i < ENCODED.length; i++) {
    DECODED[i] = ENCODED[i] ^ MASK[i % 4];
}
```