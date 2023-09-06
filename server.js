const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Открываем и читаем файл index.html
  fs.readFile('Расписание для учителей.html', (err, data) => {
    if (err) {
      console.error(err); // Записываем ошибку в консоль
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
