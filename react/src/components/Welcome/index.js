import config from "config";

import styles from "./styles.module.css";

export const Welcome = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titleBold}>Welcome to {config.appName}</h1>
      <span className={styles.description}>
        This application will let you to stream video from your PC to smart TV
      </span>
    </div>
  );
};
