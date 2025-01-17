const express = require('express');
const fs = require('fs');
const path = require('path');



const app = express();
const PORT = process.env.PORT || 5000;

// Статическая папка для json-файлов
const dataDir = path.join(__dirname, 'data');

const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,POST,PUT,DELETE,OPTIONS`);
    next();
  };
  
app.use(allowCrossDomain);
// Endpoint для получения данных глоссария
app.get('/api/glossary', (req, res) => {
    fs.readFile(path.join(dataDir, 'glossary.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read glossary data' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint для получения данных mind map
app.get('/api/mind-map', (req, res) => {
    fs.readFile(path.join(dataDir, 'mind-map.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read mind-map data' });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});