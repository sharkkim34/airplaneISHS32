const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_PATH = __dirname + '/seatData.json';

app.get('/api/seats', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH));
  res.json(data);
});

app.post('/api/select', (req, res) => {
  const { seat } = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_PATH));
  if (data[seat] !== undefined) {
    data[seat]++;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid seat ID' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
