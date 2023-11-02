const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const fs = require('fs')

// Provide support for JSON parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// REST POST to save data
app.post('/savedata', (req, res) => {
    const data = req.body
    const filename = 'DataFiles/' + data['name'] + data['age'] + '.json'
    fs.writeFile(filename, JSON.stringify(data), (err) => {
        if (err) {
        console.error(err)
        res.status(500).send('Error saving data')
        } else {
        console.log('Data saved successfully')
        res.status(200).json({ message: 'Data saved successfully' });
        }
    })
})

// Starting blocking server which listens on port 3000
app.listen(3001, () => {
  console.log('Server started on port 3001')
})