const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Helper function to read JSON file
const readFile = (file) => {
  return JSON.parse(fs.readFileSync(file));
};

// Helper function to write JSON file
const writeFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};



// ================= LOGIN API =================
app.post('/login', (req, res) => {
  const { userId, password } = req.body;

  const users = readFile('./users.json');

  const user = users.find(
    (u) => u.userId === userId && u.password === password
  );

  if (user) {
    res.json({
      status: 'success',
      message: 'Login successful',
      user: user
    });
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid credentials'
    });
  }
});



// ================= GET RECORDS API (WITH DELAY) =================
app.get('/records', (req, res) => {

  const delay = parseInt(req.query.delay) || 0;

  setTimeout(() => {

    const records = JSON.parse(fs.readFileSync('records.json'));
    res.json(records);

  }, delay);

});



// ================= ADMIN - GET USERS =================
app.get('/users', (req, res) => {
  const users = readFile('./users.json');
  res.json(users);
});



// ================= ADMIN - ADD USER =================
app.post('/users', (req, res) => {
  const users = readFile('./users.json');

  const newUser = {
    id: users.length + 1,
    userId: req.body.userId,
    password: req.body.password,
    role: req.body.role
  };

  users.push(newUser);
  writeFile('./users.json', users);

  res.json({ message: 'User added successfully', user: newUser });
});



// ================= ADMIN - UPDATE USER =================
app.put('/users/:id', (req, res) => {
  const users = readFile('./users.json');
  const id = parseInt(req.params.id);

  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    users[index].userId = req.body.userId || users[index].userId;
    users[index].password = req.body.password || users[index].password;
    users[index].role = req.body.role || users[index].role;

    writeFile('./users.json', users);

    res.json({ message: 'User updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



// ================= ADMIN - DELETE USER =================
app.delete('/users/:id', (req, res) => {
  let users = readFile('./users.json');
  const id = parseInt(req.params.id);

  users = users.filter((u) => u.id !== id);

  writeFile('./users.json', users);

  res.json({ message: 'User deleted successfully' });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});