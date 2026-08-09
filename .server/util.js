var t1 = 'The god is watching'
var t2 = 'Author : Loay Mahmoud 3 emails <loay4x4@gmail.com>,<loay4x4@yahoo.com>,<loay4x4@hotmail.com>'

import { pathToFileURL, fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const dirname = getDirName();
const apiPath = dirname.replace(".server", "api");

export function getDirName() {
    var filename = fileURLToPath(import.meta.url);
    var dirname = path.dirname(filename);
    return dirname
}

const dynamicImport = async (routePath) => {
    try {
        const route = await import(pathToFileURL(routePath).href);
        return route.default;
    } catch (err) {
        console.error(`Failed to import ${routePath}:`, err);
        return null;
    }
};

function generateKey() {
    return Math.random().toString(36).replace('0.', '') + '-' + Math.random().toString(36).replace('0.', '')
}

export function timeStamp() {
    return new Date().toString().substring(16, 24)
}


import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key-change-in-production'; // TODO: Move to env var

function getSession(token) {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
}

const publicRoutes = [
    '/auth/login',
    '/auth/register'
];

export async function apiHandler(req, res) {
    try {
        // Allow public routes without token
        const isPublic = publicRoutes.some(route => req.path.endsWith(route));

        if (!isPublic) {
            if (!req.headers.token) {
                return res.status(401).send('Unauthorized: No token provided');
            }

            var session = getSession(req.headers.token);
            if (!session) return res.status(401).json({ msg: "Invalid or expired session" });

            req.user = session; // Attach user to request
        }

        if (req.path.includes("..") || req.path.startsWith("./") || req.path.startsWith(".")) {
            return res.status(400).send("Invalid API path 1");
        }

        let filePath = path.join(apiPath, req.path);
        // Ensure extension is handled correctly
        if (!filePath.endsWith('.js')) {
            filePath += '.js';
        }

        if (fs.existsSync(filePath)) {
            let routeHandler = await dynamicImport(filePath);
            if (routeHandler) {
                return routeHandler(req, res);
            } else {
                return res.status(400).send("Invalid API path 2");
            }
        } else {
            return res.status(404).send("API path not found");
        }
    } catch (ee) {
        console.error(ee);
        return res.status(500).send(ee.message);
    }
}

