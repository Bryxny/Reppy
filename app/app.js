const express = require("express");
const app = express();
const workoutRoutes = require("./routes/workoutRoutes");

app.use(express.json());

app.use("/api", workoutRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
