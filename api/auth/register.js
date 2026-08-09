
import bcrypt from 'bcryptjs';
import { db } from '../_utils/db.js';

export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = db.users.findByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = db.users.create({
        email,
        password: hashedPassword,
        name,
        role: role || 'student', // Default role
        createdAt: new Date().toISOString()
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
}
