import express from "express";
//import 'dotenv/config';
import { timeStamp, apiHandler, getDirName } from "./util.js"
//import { SqlConnect } from "../api/_utils/sql.js";

const srcPort =5100
const devPort =5200
const productionPort=5300

const dirname = getDirName();
const app = express();

export const publicPath=dirname.replace(".server", "public");
export const distPath  =dirname.replace(".server", "dist");

app.use(express.json({ limit: "256mb" }));
app.use("/api", apiHandler);

export let isProduction=false

export async function RunServer(isPro) {
    
    isProduction=isPro

    //var success = await SqlConnect(isPro)
    //if (!success) process.exit();

    if (isPro) {
        app.use(express.static(distPath));
        app.use((req, res) => {
            res.sendFile('index.html', { root: distPath });
        });
        var PORT = productionPort;        
    } else {
        var PORT = devPort;
    }
    app.listen(PORT, () => {
        if (isPro) {
            console.log(`🚀 ➜  PRD Server Production running on port ${PORT}`);
        } else {
            console.log(`🚀 ➜  PRD Server Dev running on port ${PORT}`);
        }
        console.log('---------------------------------')
        console.log('      '+timeStamp()+"  I'm ready.")
        console.log('---------------------------------')
    });
}

//////////////////////////////////////////////////////////////////