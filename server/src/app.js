const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGO, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const uri = process.env.MONGO;
try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
} catch (error) {
  console.log("Error connecting to MongoDB Atlas", error);
}

// Routes
app.use("/data", apiRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
