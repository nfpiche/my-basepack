const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res) => res.sendFile(path.resolve(__dirname, 'dist/index.html')));

console.log(`Running on ${port}`);
app.listen(port);
