const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // 获取请求的URL路径
  const url = req.url;
  
  // 根据URL路径获取对应的文件路径
  const filePath = path.join(__dirname, url);
  
  // 读取文件内容
  fs.readFile(filePath, (err, data) => {
    //console.log(filePath, err , data)
    if (err) {
      // 如果文件读取出错，返回404错误
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      // 设置响应头
      if(filePath.includes("video\\software.js")){
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
      }
      else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
      }

      // 返回文件内容
      res.end(data);
    }
  });
});

// 启动服务器，监听指定的端口
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  console.error(err);
});