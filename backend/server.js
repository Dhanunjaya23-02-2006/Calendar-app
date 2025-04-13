const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;


mongoose.connect('mongodb://localhost:27017/calendarDB');
app.use(cors());
app.use(express.json());
app.use('/api/events', require('./routes/events'));

app.listen(port, () => console.log(`Server running on port ${port}`));