const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const routes = require('./routes/api');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
