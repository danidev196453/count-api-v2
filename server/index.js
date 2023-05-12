__path = process.cwd()
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = 3003

app.use(cors()); // Prevents CORS error

app.get('/api', function(req, res) {

    if (req.url === '/favicon.ico') {
        res.end();
    } 
    // Ends request for favicon without counting

    const json = fs.readFileSync(__path + '/database/count.json', 'utf-8');
    const obj = JSON.parse(json);
    // Reads count.json and converts to JS object

    obj.pageviews = obj.pageviews+1;
    if (req.query.type === 'visit-pageview') {
        obj.visits = obj.visits+1;
    }
    // Updates pageviews and visits (conditional upon URL param value)

    const newJSON = JSON.stringify(obj);
    // Converts result to JSON

    fs.writeFileSync(__path + '/database/count.json', newJSON);
    res.send(newJSON);
    // Writes result to file and sends to user as JSON

})

app.listen(port, () => {
    console.log("Server running on port " + port);
})