const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
