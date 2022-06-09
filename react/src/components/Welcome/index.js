import { Link } from "components/Link";
import config from "config";

import styles from "./styles.module.css";

export const Welcome = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titleBold}>Welcome to {config.appName}</h1>
      <span className={styles.description}>
        This application will let you to stream video from your PC to smart TV
      </span>
      <div className={styles.requirnments}>
        <h2>Requirnments</h2>
        <span className={styles.description}>
          {config.appName} requires to have{" "}
          <Link href="https://nodejs.org/en/">NodeJS</Link>, and{" "}
          <Link href="https://git-scm.com/download/win">Git</Link> (for Windows)
          installed before using.
        </span>
      </div>
    </div>
  );
};
