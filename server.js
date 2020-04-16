const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.use('/api/users/', require('./routes/users'));
app.use('/api/contacts/', require('./routes/contacts'));
app.use('/api/auth/', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));