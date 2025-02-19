const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Authorization token required" });

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });
        req.user = user; // Attach user info to request
        next();
    });
};

// Authentication routes
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// Protected trip routes
router
  .route("/trips")
  .get(tripsController.tripsList)  // Public route
  .post(authenticateJWT, tripsController.tripsAddTrip); // Protected: Requires authentication

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode) // Public route
  .put(authenticateJWT, tripsController.tripsUpdateTrip); // Protected: Requires authentication

module.exports = router;
