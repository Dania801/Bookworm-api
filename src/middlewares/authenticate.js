import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const header = req.headers.authorization;
    let token;

    if (header) token = header.split(' ')[1];
    token = `Bearer ${token}`
    if (token) {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            next();
        })
    } else {
        res.status(401).json({
            errors: {
                global: "No token"
            }
        })
    }
}