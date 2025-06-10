import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost', // replace with your database host
  user: 'root', // replace with your MySQL username
  password: 'root', // replace with your MySQL password
  database: 'tyba_shipping', // replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const query = 'INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).send('Internal server error');
    }
    res.status(200).send('Form submission successful');
  });
});

// GET route to retrieve all form submissions
app.get('/api/contact', (req, res) => {
  const query = 'SELECT * FROM contact_form';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data: ', err);
      return res.status(500).send('Internal server error');
    }
    res.status(200).json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
