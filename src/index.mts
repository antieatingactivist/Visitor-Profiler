import express, {Response, Request} from "express";
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

app.get("/hit", async function(req: Request, res: Response) {
    const ip: string = req.headers["x-forwarded-for"] as string || "69.69.69.69";
    
    if (ip && ip.split(".")[0] !== ("10" || "192")) {
        const object = {...req.headers};
        try {
            const location = await axios.get(`https://api.ipdata.co/${ip}?api-key=${API_KEY}`);
            object.location = {...location.data};
        }
        catch {
            console.error("Error Geolocation");
        }
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

app.get("/raw/:id", async function(req: Request, res: Response) {
    const data = await Visitor.findByPk(req.params.id, {});
    console.log(req.params.id);
    res.json(data);  
});

app.put("/hide/:id", async function(req: Request, res: Response) {
    const data = await Visitor.update(
        { hidden: true },
        { where: {id: req.params.id}}
    );

    res.json(data);
});

app.put("/show/:id", async function(req: Request, res: Response) {
    const data = await Visitor.update(
        { hidden: false },
        { where: {id: req.params.id}}
    );

    res.json(data);
});

app.get("/raw", async function(_ :never, res: Response) {
    const data = await Visitor.findAll({});
    res.json(data);  
});

app.get("/count", async function(_ :never, res: Response) {
    const count = await Visitor.count({});
    res.json(count);  
});

app.get("/data", async function(req: Request, res: Response) {
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
 

        if (!(visitor["from"]?.includes("bot") 
            || object["userAgent"]?.includes("Expanse")
            || object["userAgent"]?.includes("bot")
            || object["userAgent"]?.includes("Bot"))
            
            ) {
            responseData.push(object);
        }
    }

    res.json(responseData);  
});

app.get("*", (_ :never, res: Response) =>{
    res.sendFile(path.join(__dirname+"/views/index.html"));
});

function parseData(visitor: Visitor, otherVisits?: Visitor[]) {
    let data: object;
    try {
        data = {
            hidden: visitor.hidden,
            id: visitor.id,
            ip: visitor.ip,
            time: new Date(visitor.createdAt).toLocaleString(),
            unixTime: new Date(visitor.createdAt).getTime(),  
        };
        return {
            ...data,
            userAgent: visitor.data["user-agent"],
            city: visitor.data["location"]["city"],
            region: visitor.data["location"]["region"],
            country: `${visitor.data["location"]["country_name"]}`,
            flag: `${visitor.data["location"]["emoji_flag"]}`,
            otherVisits: otherVisits?.map( (visit: Visitor ) => {
                return parseData(visit);
            })
        };
        
    } catch {
        console.error("Parsing Error");
        return data;
    }

}

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

