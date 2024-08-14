require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Redis = require("redis");
const Pusher = require("pusher");

const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Redis client
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
  // If you have a password, uncomment the next line and add it to your .env file
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect().catch(console.error);

// Pusher setup
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// Make Redis and Pusher clients available to routes
app.use((req, res, next) => {
  req.redisClient = redisClient;
  req.pusher = pusher;
  next();
});

// Routes
app.use("/api/sessions", sessionRoutes);

app.post("/test-detailed", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Raw body:", req.rawBody);
  console.log("Content-Type:", req.get("Content-Type"));
  res.json({
    headers: req.headers,
    body: req.body,
    rawBody: req.rawBody,
    contentType: req.get("Content-Type"),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
