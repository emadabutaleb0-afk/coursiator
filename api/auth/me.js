
export default async function (req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // req.user is set by the middleware in .server/util.js
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    res.status(200).json({ user: req.user });
}
