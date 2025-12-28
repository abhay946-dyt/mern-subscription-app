require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- added

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mern-subscription-app-kpwv.vercel.app'
  ],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));

app.listen(5000, () => console.log('Server running on 5000'));
