const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exit the process if the database connection fails
  });

// Import the Item model (ensure the path is correct)
const Item = require("./models/Item");

// API routes
app.get("/api/", (_req, res) => {
  res.json({ message: "Hello from the Node.js Backend!" });
});

// POST /api/item route to add a new item
app.post("/api/item", async (req, res) => {
  const { name, description } = req.body;
  try {
    const item = new Item({ name, description });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a GET route for /api/item if you need to retrieve items
app.get("/api/item", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback route for handling 404 errors
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
