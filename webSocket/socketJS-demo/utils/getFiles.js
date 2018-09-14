//getFiles.js
// https://blog.csdn.net/qq_36245035/article/details/81070081

var fs = require('fs');
 
// 获取路径下的所有文件
function getRoute(path) {
    // 定义一个对象
    let obj = {};
    // 读取文件，返回一个对象
    let resDir = fs.readdirSync(path);
    // 循环遍历对象
    for (let i in resDir) {
        // 输入的路径拼接下一个文件（文件夹）
        let road = path + '/' + resDir[i];
        // 获取Stats 所有属性
        let res = fs.statSync(road);
        // 获取到的文件是否是文件夹
        if (res.isDirectory()) {
            // 把文件夹名赋给obj对象当属性，回调函数为值
            obj[resDir[i]] = getRoute(road);
        }else{
            // 把文件名赋给obj对象当属性，true为值
            obj[resDir[i]] = true;
        }
    }
    return obj;
}
 
console.log(getRoute('C:/wamp/www/nodeItem/demo0716/day0716'));
