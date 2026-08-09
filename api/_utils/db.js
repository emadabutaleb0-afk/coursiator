
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../_data/users.json');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function readUsers() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users:", error);
        return [];
    }
}

function writeUsers(users) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing users:", error);
    }
}

export const db = {
    users: {
        all: () => readUsers(),
        findByEmail: (email) => {
            const users = readUsers();
            return users.find(u => u.email === email);
        },
        create: (user) => {
            const users = readUsers();
            const newUser = { id: Date.now().toString(), ...user };
            users.push(newUser);
            writeUsers(users);
            return newUser;
        }
    }
};
