const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const mongodb = require('./config/db');

const app = express();


mongodb();

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
