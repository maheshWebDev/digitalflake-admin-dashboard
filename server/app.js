const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const app = express();

// Configure CORS for All Access
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse incoming requests with JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/productRouter"));

const PORT = process.env.PORT || 8000;
// Connect to the database
mongoose
  .connect(process.env.CONN_STR, {})
  .then((conn) => {
    // console.log(conn);
    console.log("DB connection successful....");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
