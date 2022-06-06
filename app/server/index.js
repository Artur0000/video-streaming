const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const config = require("./config.json");
const app = express();

app.use(express.static(path.join(__dirname, "web")));
app.use(express.static(config.sourcePath));

app.get("/video/names", function (req, res) {
  exec(`find '${config.sourcePath}' -maxdepth 1 -type f`, (error, result) => {
    if (!error) {
      const resultArray = result
        .split("\n")
        .map((videoName) => videoName.split(`${config.sourcePath}/`)[1])
        .filter((file) => file !== ".DS_Store");
      res.status(200).send(resultArray.slice(0, resultArray.length - 1));
      return;
    }
    res.status(500).send("Cannot read videos source path");
  });
});

app.get("/play", function (req, res) {
  res.sendFile(path.join(__dirname, "web", "play", "index.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "web", "index.html"));
});

app.listen(80);
