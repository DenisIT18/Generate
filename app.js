const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Определяем путь к запрашиваемому файлу
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html'; // Если URL оканчивается на "/", открываем index.html
  }

  // Определяем MIME-тип файла
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
  }[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // Если файл не найден, отправляем ошибку 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
      } else {
        // Если возникла другая ошибка, отправляем ошибку 500
        res.writeHead(500);
        res.end('Internal Server Error: ' + error.code);
      }
    } else {
      // Если файл найден, отправляем его содержимое
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
