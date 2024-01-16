const express = require('express');
const { Pool } = require('pg');
const cors = require('cors')
const app = express();
const port = 3000;
process.env.PGADMIN_MAIL
app.use(express.json());

app.use(cors())

// TODO: Integrate env variables into this connection string builder
const pool = new Pool({
  user: 'kbester',
  host: 'the_db',
  database: 'grads',
  password: 'postgres',
  port: 5432,
});

// Get all employees
app.get('/employees', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM employees');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Add a new employee
  app.post('/employees', async (req, res) => {
    try {
      const { name, position } = req.body;
      const result = await pool.query('INSERT INTO employees (name, position) VALUES ($1, $2) RETURNING *', [
  name, position]);
  res.json(result.rows[0]);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });
  
  // Update an employee
  app.put('/employees/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const { name, position } = req.body;
  const result = await pool.query('UPDATE employees SET name = $1, position = $2 WHERE id = $3 RETURNING *', [name, position, id]);
  res.json(result.rows[0]);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });
  
  // Delete an employee
  app.delete('/employees/:id', async (req, res) => {
  try {
  const { id } = req.params;
  await pool.query('DELETE FROM employees WHERE id = $1', [id]);
  res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });
  
  // Get skills for an employee
  app
  
  .get('/employees/:id/skills', async (req, res) => {
  try {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM skills WHERE employee_id = $1', [id]);
  res.json(result.rows);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });
  
  // Add a skill to an employee
  app.post('/employees/:id/skills', async (req, res) => {
  try {
  const { id } = req.params;
  const { skill } = req.body;
  const result = await pool.query('INSERT INTO skills (employee_id, skill) VALUES ($1, $2) RETURNING *', [id, skill]);
  res.json(result.rows[0]);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });
  
  // Delete a skill
  app.delete('/skills/:id', async (req, res) => {
  try {
  const { id } = req.params;
  await pool.query('DELETE FROM skills WHERE id = $1', [id]);
  res.status(200).json({ message: 'Skill deleted' });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  });
  
  app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
  });