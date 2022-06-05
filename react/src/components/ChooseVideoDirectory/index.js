import { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { StreamingContext } from "App";

import styles from "./styles.module.css";

export const ChooseVideoDirectory = () => {
  const { isStreamStarted } = useContext(StreamingContext);
  const [selectedPath, setSelectedPath] = useState("");

  useEffect(() => {
    (async () => {
      const selectedDirectory = await window.bridge.selectedVideosDirectory();
      setSelectedPath(selectedDirectory);
    })();
  }, []);

  const onFileSelect = async () => {
    const path = await window.bridge.chooseVideosDirectory();
    if (path) {
      setSelectedPath(path);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select videos director</h2>
      <span className={styles.selectedDirectory}>
        Selected directory:{" "}
        <span className={styles.selectedDirectoryValue}>{selectedPath}</span>
      </span>
      <Button
        className={styles.selectButton}
        disabled={isStreamStarted}
        onClick={onFileSelect}
      >
        Select
      </Button>
    </div>
  );
};
