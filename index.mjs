import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import data from './data.json' assert { type: "json" };
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.set('trust proxy', true);



app.get("/", async function(req, res) {
    const ip = req.headers["x-forwarded-for"];
    console.log(ip);
    if (ip.split('.')[0] !== "10") {
        const location = await axios.get(`https://api.ipdata.co/${ip}?api-key=${API_KEY}`);
        console.log(location);
        const object = {...req.headers, location: {...location.data}}
        data.push(object);
    }

    writeFile(JSON.stringify(data, null, 2));
    res.sendFile(__dirname +  "/index.html");  
});

app.get("/test", async function(req, res) {
    const location = await axios.get(`https://api.ipdata.co/8.8.8.8?api-key=${API_KEY}`);

    res.json(location.data);

})

app.get("/raw", function(req, res) {
    res.json(data);  
});

app.get("/data", function(req, res) {
    const responseData = [];
    for (let visitor of data) {
        let object = {};
        object.ip = visitor['x-forwarded-for'];
        object.time = new Date(visitor['x-start-time']).toLocaleString();
        object.userAgent = visitor['user-agent'];
 

        if (visitor['from']?.includes('bot') || object.userAgent?.includes('Expanse')) {
            // responseData.push({"bot": " "});
        }
        
        else responseData.push(object);
    }

    res.json(responseData);  
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

function writeFile(data) {
    fs.writeFileSync("./data.json", data, (err) => err ? console.log(err) : console.log("\x1b[1m\x1b[32m%s\x1b[0m", "\n -- Successfully added data to file"));
}