const { exec } = require("child_process");
const { networkInterfaces } = require("os");

const getCurrentNodeProcesses = () =>
  new Promise((resolve) => {
    if (process.platform !== "darwin") {
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
    } else {
      exec("ps -ax | grep ' node'", (error, result) => {
        const nodePids = result
          .split("\n")
          .reduce((result, proc) => {
            return proc
              ? [...result, proc.split(" ").filter((item) => item !== "")]
              : result;
          }, [])
          .filter((item) => item[3] === "node")
          .map((item) => Number(item[0]));
        resolve(nodePids);
      });
    }
  });

const getLocalIp = () => {
  const nets = networkInterfaces();
  const net = nets.WiFi ?? nets.Ethernet ?? nets.en0;

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
