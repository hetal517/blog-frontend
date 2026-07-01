const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {

    try {

        const token = req.headers.authorization;

        console.log(token);

        if (!token) {
            return res.status(401).json({
                message: "No token found"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(verifyToken);

        req.user = verifyToken;
        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            message: "Invalid token"
        });

    }

};

module.exports = protect;