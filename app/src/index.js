const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fixPath = require("fix-path");

const {
  selectedAndSetDirectory,
  chooseAndSetDirectory,
  openLink,
  startStreaming,
  stopStreaming,
  getIp,
} = require("./eventHandlers");

const isDevelopment = Number(process.env.ELECTRON_DEV);

if (!isDevelopment) {
  if (process.platform === "darwin") {
    fixPath();
  } else {
    process.env.PATH = [
      "C:\\Program Files\\Git\\usr\\bin",
      ...process.env.PATH.split(";"),
    ].join(";");
  }
}

if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("selectedVideosDirectory", selectedAndSetDirectory);
  ipcMain.handle("chooseVideosDirectory", chooseAndSetDirectory);
  ipcMain.on("openLink", openLink);
  ipcMain.handle("startStreaming", startStreaming);
  ipcMain.handle("stopStreaming", stopStreaming);
  ipcMain.handle("getLocalIp", getIp);

  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../", "build", "index.html"));
  }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    stopStreaming();
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
