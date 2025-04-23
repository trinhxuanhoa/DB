const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Cấu hình MySQL từ Railway
const db = mysql.createConnection({
  host: 'shortline.proxy.rlwy.net',
  user: 'root',
  password: 'UqEsdGHElSPxNxvhcyNucdxBQlHlTqzP',
  database: 'railway',
  port: 25929
});

// Kết nối MySQL
db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL on Railway');
});

// API trả danh sách từ vựng
app.get('/vocabulary', (req, res) => {
  const query = 'SELECT * FROM vocabulary';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Lỗi truy vấn DB');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
