import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setMode(newMode);
    if (replace === true) setHistory(history => history.slice(0, history.length - 1));
    setHistory(history => [...history, newMode]);
  };

  const back = function() {
    if (history.length > 1) {
      setMode(m => history[history.length - 2]);
      setHistory(history => history.slice(0, history.length - 1));
    }
  };

  return { mode, transition, back };
}