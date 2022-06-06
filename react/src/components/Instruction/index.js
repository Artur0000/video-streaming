import { useEffect, useState } from "react";
import { Link } from "components/Link";

import styles from "./styles.module.css";

export const Instruction = () => {
  const [localIp, setLocalIp] = useState();

  useEffect(() => {
    (async () => {
      const ip = await window.bridge.getLocalIp();
      setLocalIp(ip);
    })();
  }, []);

  return (
    <dev className={styles.container}>
      <h2>Instruction</h2>
      <ol>
        <li>
          Be sure you have installed{" "}
          <Link href="https://nodejs.org/en/">NodeJS</Link>, and{" "}
          <Link href="https://git-scm.com/download/win">Git</Link> (for
          Windows).
        </li>
        <li>Select directory where videos are located.</li>
        <li>
          Press <b>Start</b> button to start server.
        </li>
        <li>
          On your TV open browser and type your PC local ip <b>{localIp}</b> .
        </li>
      </ol>
    </dev>
  );
};
