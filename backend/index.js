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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// danger: SQL injection
app.get('/repositories/:userQuery', async (req, res) => {
  const { userQuery } = req.params;

  const query = `SELECT * FROM Repository WHERE tag = '${userQuery}' AND public = 1`;
  try {
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
