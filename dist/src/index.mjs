var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import data from '../data.json' assert { type: "json" };
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
dotenv.config();
var app = express();
var PORT = process.env.PORT || 3000;
var API_KEY = process.env.API_KEY;
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.set('trust proxy', true);
app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var ip, location_1, object;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ip = "11.0.0.0";
                    if (!(ip && ip.split('.')[0] !== "10")) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios.get("https://api.ipdata.co/".concat(ip, "?api-key=").concat(API_KEY))];
                case 1:
                    location_1 = _a.sent();
                    object = __assign(__assign({}, req.headers), { location: __assign({}, location_1.data) });
                    data.push(object);
                    _a.label = 2;
                case 2:
                    writeFile(JSON.stringify(data, null, 2));
                    res.send('<p></p>');
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/raw", function (req, res) {
    res.json(data);
});
app.get("/purge", function (req, res) {
    data.splice(0, data.length);
    res.json(data);
});
app.get("/data", function (req, res) {
    var _a, _b;
    var responseData = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var visitor = data_1[_i];
        var object = {
            ip: visitor['x-forwarded-for'],
            time: new Date(visitor['x-start-time']).toLocaleString(),
            userAgent: visitor['user-agent'],
            city: visitor['location']['city'],
            region: visitor['location']['region'],
            country: visitor['location']['country_name']
        };
        if (((_a = visitor['from']) === null || _a === void 0 ? void 0 : _a.includes('bot')) || ((_b = object.userAgent) === null || _b === void 0 ? void 0 : _b.includes('Expanse'))) {
            // responseData.push({"bot": " "});
        }
        else
            responseData.push(object);
    }
    res.json(responseData);
});
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT, "!"));
});
function writeFile(data) {
    fs.writeFileSync("./data.json", data, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("\x1b[1m\x1b[32m%s\x1b[0m", "\n -- Successfully added data to file");
        }
    });
}
//# sourceMappingURL=index.mjs.map