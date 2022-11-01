import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs, { WriteFileOptions } from 'fs';
import data from './data.json' assert { type: "json" };
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import Visitor from './models/Visitor.mjs';


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
    // const ip: string = req.headers["x-forwarded-for"] as string;
    const ip = "11.0.0.0";
    

    if (ip && ip.split('.')[0] !== "10") {
        const location = await axios.get(`https://api.ipdata.co/${ip}?api-key=${API_KEY}`);

        const object = {...req.headers, location: {...location.data}}
        // data.push(object);
        await Visitor.create({data: object});

    }

    writeFile(JSON.stringify(data, null, 2));
    res.send('<p></p>');
});


app.get("/raw", function(req, res) {
    res.json(data);  
});

app.get("/purge", function(req, res) {
    data.splice(0,data.length);
    res.json(data);  
});

app.get("/data", function(req, res) {
    const responseData = [];
    for (let visitor of data) {
        let object = {
            ip: visitor['x-forwarded-for'],
            time: new Date(visitor['x-start-time']).toLocaleString(),
            userAgent: visitor['user-agent'],
            city: visitor['location']['city'],
            region: visitor['location']['region'],
            country: visitor['location']['country_name']
        }
 

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
    fs.writeFileSync(
        "./data.json", 
        data,
        function(err: string) {
            if (err) {
                console.log(err)  
            } else {
                console.log("\x1b[1m\x1b[32m%s\x1b[0m", "\n -- Successfully added data to file")
            }
        }  as WriteFileOptions
        
    );
}