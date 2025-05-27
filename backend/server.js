const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/faceid_db'; // Change as needed
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendances');

app.use('/api/employees', employeeRoutes);
app.use('/api/attendances', attendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
