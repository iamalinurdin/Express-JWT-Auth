require('dotenv/config');

const express  = require('express');
const mongoose = require('mongoose');
const app      = express();
const connect  = mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

// import routes
const AuthRoutes = require('./routes/AuthRoutes');
const PostRoutes = require('./routes/PostRoutes');

// middleware
app.use(express.json());

app.use('/api/user', AuthRoutes);
app.use('/api/post', PostRoutes);

app.listen(3000);