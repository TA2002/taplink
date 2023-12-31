const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(cors());

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Test successful" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
