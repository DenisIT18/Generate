// db.js
const db = new sqlite3.Database('schedule.db');
const mysql = require('mysql');
const dbConfig = require('./dbconfig');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к БД:', err);
    throw err;
  }
  console.log('Подключение к БД успешно');
});

const createScheduleTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schedule (
      id INT AUTO_INCREMENT PRIMARY KEY,
      dayOfWeek VARCHAR(255),
      className VARCHAR(255),
      subject VARCHAR(255),
      parallelLesson BOOLEAN
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Ошибка при создании таблицы:', err);
      throw err;
    }
    console.log('Таблица "schedule" создана или уже существует');
  });
};

module.exports = { connection, createScheduleTable };
db.close();






