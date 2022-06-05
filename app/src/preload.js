const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bridge", {
  selectedVideosDirectory: () => ipcRenderer.invoke("selectedVideosDirectory"),
  chooseVideosDirectory: () => ipcRenderer.invoke("chooseVideosDirectory"),
  openLink: (href) => ipcRenderer.send("openLink", href),
  startStreaming: () => ipcRenderer.invoke("startStreaming"),
  stopStreaming: () => ipcRenderer.invoke("stopStreaming"),
  getLocalIp: () => ipcRenderer.invoke("getLocalIp"),
});
