import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cors());
app.set('trust proxy', true)

app.post("/", function(req, res) {
    console.log(req)
    res.json(req.headers);  
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});