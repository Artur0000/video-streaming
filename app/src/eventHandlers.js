const { dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { getCurrentNodeProcesses, getLocalIp } = require("../helpers");

const selectedAndSetDirectory = () => {
  const config = require(path.join(__dirname, "../server/config.json"));
  return config.sourcePath;
};

const chooseAndSetDirectory = async () => {
  const {
    canceled,
    filePaths: [filePath],
  } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (canceled) {
    return;
  } else {
    await savePath(filePath);
    return filePath;
  }
};

const savePath = (directory) =>
  new Promise((resolve, reject) => {
    const configFileName = path.join(__dirname, "../server/config.json");
    const config = require(configFileName);
    if (!config) {
      reject(new Error(`File is not found: ${configFileName}`));
    }
    config.sourcePath = directory;
    fs.writeFile(configFileName, JSON.stringify(config), (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

const openLink = (_, href) => shell.openExternal(href);

let nodeServerPids;

const startStreaming = () =>
  new Promise(async (resolve, reject) => {
    const pidsBeforeStart = await getCurrentNodeProcesses();
    const serverPath = path.join(__dirname, "../server");
    const child = exec(
      `cd ${
        process.env.platform === "darvin" ? `'${serverPath}'` : serverPath
      } && npm start`,
      (error) => {
        if (error) {
          reject(error);
        }
      }
    );

    child.stdout.on("data", async () => {
      const pidsAfterStart = await getCurrentNodeProcesses();
      const pids = pidsAfterStart.filter(
        (pid) => pidsBeforeStart.indexOf(pid) === -1
      );
      nodeServerPids = pids;
      setTimeout(() => resolve(), 1000);
    });
  });

const stopStreaming = () =>
  new Promise((resolve, reject) => {
    if (process.platform !== "darwin") {
      nodeServerPids.forEach((pid, index) => {
        exec(`taskkill /pid ${pid} /F`, (error) => {
          if (error) {
            reject(error);
          }
          if (index === nodeServerPids.length - 1) {
            resolve();
          }
        });
      });
    } else {
      exec("ps -ax | grep './index.js'", (error, result) => {
        if (error) {
          reject(error);
        }

        const pid = Number(
          result
            .split("\n")
            .find((item) => item.split(" ").find((i) => i === "node"))
            .split(" ")
            .filter((item) => item)[0]
        );

        exec(`kill ${pid}`, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
  });

const getIp = () => getLocalIp();

module.exports = {
  selectedAndSetDirectory,
  chooseAndSetDirectory,
  openLink,
  startStreaming,
  stopStreaming,
  getIp,
};
