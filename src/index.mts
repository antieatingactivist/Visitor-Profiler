import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { Visitor } from "./models/index.mjs";
import { Op } from "sequelize";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "views")));
app.set("trust proxy", true);



app.get("/hit", async function(req, res) {
    const ip: string = req.headers["x-forwarded-for"] as string;
    // const ip = "11.0.0.0";
    
    if (ip && ip.split(".")[0] !== "10") {
        const location = await axios.get(`https://api.ipdata.co/${ip}?api-key=${API_KEY}`);
        const object = {...req.headers, location: {...location.data}};

        await Visitor.create({
            data: object,
            ip: ip,  
        });
    }
    if (process.env.DEMO_MODE === "true") {
        res.redirect(`/welcome?ip=${ip}`);
    }
    else res.send("<p></p>");

});


app.get("/raw/:id", async function(req, res) {
    const data = await Visitor.findByPk(req.params.id, {});
    console.log(req.params.id);
    res.json(data);  
});

app.put("/hide/:id", async function(req, res) {
    const data = await Visitor.update(
        { hidden: true },
        { where: {id: req.params.id}}
    );

    res.json(data);
});
app.put("/show/:id", async function(req, res) {
    const data = await Visitor.update(
        { hidden: false },
        { where: {id: req.params.id}}
    );

    res.json(data);
});
app.get("/raw", async function(_req, res) {
    const data = await Visitor.findAll({});
    res.json(data);  
});

app.get("/count", async function(_req, res) {
    const { count } = await Visitor.findAndCountAll({});
    res.json(count);  
});


app.get("/data", async function(req, res) {
    console.log(req.query);
    const responseData = [];
    let visitors: Visitor[];
    if (req.query.showHidden) {
        visitors = await Visitor.findAll({
            raw: true,
        });
    } else {
        visitors = await Visitor.findAll({
            where: { hidden: false },
            raw: true,
        });
    }

    for (const visitor of visitors) {

        // const visitorData = visitor.data;
        const otherVisits = await Visitor.findAll({
            where: { 
                ip: visitor.ip,
                id: {
                    [Op.not]: visitor.id
                }

            },
            // attributes: ["id", "createdAt"],
            raw: true,
        });

        const object = parseData(visitor, otherVisits);
 

        if (!(visitor["from"]?.includes("bot") || object.userAgent?.includes("Expanse"))) {
            responseData.push(object);
        }
    }

    res.json(responseData);  
});

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname+"/views/index.html"));
});

function parseData(visitor: Visitor, otherVisits?: Visitor[]) {
    return {
        hidden: visitor.hidden,
        id: visitor.id,
        ip: visitor.ip,
        time: new Date(visitor.createdAt).toLocaleString(),
        unixTime: new Date(visitor.createdAt).getTime(),
        userAgent: visitor.data["user-agent"],
        city: visitor.data["location"]["city"],
        region: visitor.data["location"]["region"],
        country: `${visitor.data["location"]["country_name"]}`,
        flag: `${visitor.data["location"]["emoji_flag"]}`,
        otherVisits: otherVisits?.map( (visit: Visitor ) => {
            return {
                // ...visit,
                ...parseData(visit)
                // id: visit.id,
                // time: new Date(visit.createdAt).toLocaleString()
            };
        })
    };
}
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

