require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

// Routes
// app.use('/user', require('./routes/userRouter'));
// app.use('/api', require('./routes/categoryRouter'));
// app.use('/api', require('./routes/upload'));
// app.use('/api', require('./routes/productRouter'));
// app.use('/api', require('./routes/paymentRouter'));
app.use('/api', require('./routes/serviceRouter'));

// Connect to MongoDB
const URI = process.env.DB_CONNECTION_STRING;
mongoose.connect(URI, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
