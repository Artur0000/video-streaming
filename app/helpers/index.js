const { exec } = require("child_process");
const { networkInterfaces } = require("os");

const getCurrentNodeProcesses = () =>
  new Promise((resolve) => {
    exec("tasklist | grep node", (error, result) => {
      const nodePids = result.split("\n").reduce((result, proc) => {
        return proc
          ? [
              ...result,
              Number(proc.split(" ").filter((item) => item !== "")[1]),
            ]
          : result;
      }, []);
      resolve(nodePids);
    });
  });

const getLocalIp = () => {
  const nets = networkInterfaces();
  const net = nets.WiFi ?? nets.Ethernet;

  if (!net) {
    return;
  }

  const ip = net.find((item) => item.family === "IPv4");
  if (!ip) {
    return;
  }

  return ip.address;
};

module.exports = {
  getCurrentNodeProcesses,
  getLocalIp,
};
