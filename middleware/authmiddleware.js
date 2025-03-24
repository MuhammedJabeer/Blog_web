const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey";

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login"); 
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;  
        next();
    } catch (error) {
        res.clearCookie("token"); 
        res.redirect("/login"); 
    }
};



exports.requireGuest = (req, res, next) => {
    const token = req.cookies.token;

    if (token) { 
        try {
            jwt.verify(token, SECRET_KEY);
            return res.redirect("/home"); 
        } catch (error) {
            res.clearCookie("token"); 
        }
    }

    next(); // Allow guests to proceed
};



exports.requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).render("error", { message: "Access Denied: Admins only" });
    }
    next();
};
