import express from 'express';
import { connection } from './db.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Probando api' });
});

app.get('/ping', async (req, res) => {
  const result = await connection.query('SELECT NOW()');
  res.json(result[0]);
});

// danger: SQL injection
app.get('/login/:username/:password', async (req, res) => {
  let { username, password } = req.params;

  username = decodeURIComponent(username);
  password = decodeURIComponent(password);

  const query = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;
  try {
    const [rows] = await connection.query(query);

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful', user: rows[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// good practices
/*app.get('/login/:username/:password', async (req, res) => {
  const { username, password } = req.params;

  try {
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    const [rows] = await connection.query(query, [username, password]);

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful', user: rows[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); */

// danger: SQL injection
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;
  try {
    const [rows] = await connection.query(query);

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful', user: rows[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// good practices
/* app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    const [rows] = await connection.query(query, [username, password]);

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful', user: rows[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); */

// danger: SQL injection
app.get('/repositories/:userQuery', async (req, res) => {
  let { userQuery } = req.params;

  // Decode the parameter from the URL
  userQuery = decodeURIComponent(userQuery);

  const query = `SELECT * FROM Repository WHERE tag = '${userQuery}' AND public = 1`;
  try {
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// good practices
/* app.get('/repositories/:userQuery', async (req, res) => {
  let { userQuery } = req.params;

  // Decode the parameter from the URL
  userQuery = decodeURIComponent(userQuery);

  try {
    const query = 'SELECT * FROM Repository WHERE tag = ? AND public = 1';
    const [rows] = await connection.query(query, [userQuery]);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
