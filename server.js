const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the 'path' module


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());


app.use(express.static(__dirname + '/templates'));

mongoose.connect('mongodb://127.0.0.1/lights', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const lightSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  email:{ type: String, default: '' },
  address:{ type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  zipCode: { type: Number, default: '' },
  cName: { type: String, default: '' },
  cardNo: { type: Number, default: '' },
  expMonth: { type: Number, default: '' },
  expYear: { type: Number, default: '' },
});

const Lights = mongoose.model('Lights', lightSchema);


app.get('/Lights', (req, res) => {
  const filePath = path.join(__dirname, 'templates','orders.html');
  res.sendFile(filePath);
});


app.post('/Lights', async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      city,
      state,
      zipCode,
      cName,
      cardNo,
      expMonth,
      expYear,
    } = req.body;

    // Use insertOne to directly insert the document
    await Lights.collection.insertOne({
      fullName,
      email,
      address,
      city,
      state,
      zipCode,
      cName,
      cardNo,
      expMonth,
      expYear,
    });

    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
