import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import data from './data.json' assert { type: "json" };


const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cors());
app.set('trust proxy', true);



app.get("/", function(req, res) {
    data.push(req.headers);
    writeFile(JSON.stringify(data, null, 2));
    res.json(req.headers);  
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

function writeFile(data) {
    fs.writeFileSync("./data.json", data, (err) => err ? console.log(err) : console.log("\x1b[1m\x1b[32m%s\x1b[0m", "\n -- Successfully added data to file"));
}