//socketClient.js

window.onload = function(){
    //UI细节
    var nick  = prompt("Enter your nickname");  //获取用户昵称
    var input = document.getElementById("input");   //查找input字段
    input.focus();
    //打开一个WebSocket，用于发送和接收聊天消息。
    //假设下载的HTTP服务器作为WebSocket服务器运作，并使用同样的主机名&端口，
    //只是协议由 http:// 变成 ws://
    // var socket = new WebSocket("ws://" + location.host + "/");
    var port = 8000;
    var socket = new WebSocket("ws://" + location.hostname + ":" + port + "/");

    //以下展示：通过WebSocket从服务器获取消息
    socket.onmessage = function(event) {            //当收到一条消息
        console.log(event, "event");
        var msg = event.data;                       //从事件对象中获取消息内容
        var node = document.createTextNode(msg);    //将它标记为一个文本节点
        var div = document.createElement("div");     //创建一个<div>
        div.appendChild(node);                      //将文本节点添加到该div中
        document.body.insertBefore(div, input);     //在input前添加该div
        input.scrollIntoView();                     //确保输入框可见
    }
    // 下面展示了如何通过WebSocket发送消息给服务端
    input.onchange = function(){                    //当用户敲击回车键
        var msg = nick + ":" +input.value;          //用户昵称加上用户的输入
        socket.send(msg);                           //通过套接字传递该内容
        input.value = "";                           //等待更多内容的输入
    }
};

