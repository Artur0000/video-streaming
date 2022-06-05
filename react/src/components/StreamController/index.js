import { Button } from "antd";
import { StreamingContext } from "App";
import { useContext } from "react";

import styles from "./styles.module.css";

export const StreamController = () => {
  const { isStreamStarted, setIsStreamStarted } = useContext(StreamingContext);

  const onStart = async () => {
    setIsStreamStarted(true);
    try {
      await window.bridge.startStreaming();
    } catch (error) {
      setIsStreamStarted(false);
    }
  };

  const onStop = async () => {
    setIsStreamStarted(false);
    try {
      await window.bridge.stopStreaming();
    } catch (error) {
      setIsStreamStarted(true);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Start stream</h2>
      <span>
        Press <b>Start</b> button to start streaming or <b>Stop</b> to stop it.
      </span>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.startButton}
          disabled={isStreamStarted}
          onClick={onStart}
        >
          Start
        </Button>
        <Button
          disabled={!isStreamStarted}
          className={styles.stopButton}
          onClick={onStop}
        >
          Stop
        </Button>
      </div>
    </div>
  );
};
