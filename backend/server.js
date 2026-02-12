const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("../frontend"));

app.get("/api/sites", (req, res) => {
  const data = fs.readFileSync("./sites.json", "utf-8");
  res.json(JSON.parse(data));
});

app.get("/api/sites/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./sites.json", "utf-8"));
  const site = data.find(s => s.id == req.params.id);
  res.json(site);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});