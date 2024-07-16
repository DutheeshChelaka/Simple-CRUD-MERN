const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching users.', details: err });
  }
});

app.get('/getUser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the user.', details: err });
  }
});

app.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name: req.body.name, email: req.body.email, age: req.body.age },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the user.', details: err });
  }
});

app.post('/create', async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating the user.', details: err });
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting the user.', details: err });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001!');
});
