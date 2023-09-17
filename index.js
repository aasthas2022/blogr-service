const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');

app.use(bodyParser.json());
app.use('/', routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
