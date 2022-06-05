import { createContext, useState } from "react";
import { Welcome } from "components/Welcome";
import { ChooseVideoDirectory } from "components/ChooseVideoDirectory";
import { StreamController } from "components/StreamController";
import { Instruction } from "components/Instruction";

import "./App.css";

export const StreamingContext = createContext("StreamingContext");

function App() {
  const [isStreamStarted, setIsStreamStarted] = useState(false);

  return (
    <StreamingContext.Provider value={{ isStreamStarted, setIsStreamStarted }}>
      <div className="App">
        <Welcome />
        <ChooseVideoDirectory />
        <StreamController />
        <Instruction />
      </div>
    </StreamingContext.Provider>
  );
}

export default App;
