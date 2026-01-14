const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const adminRoutes = require('./routes/admin');
app.use('/', adminRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
