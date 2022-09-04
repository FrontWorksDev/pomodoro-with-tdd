import React, { useState } from "react";

interface Timer {
  work: number;
  break: number;
}

const TIMER_LENGTH: Timer = {
  work: 25 * 60,
  break: 5 * 60,
};

type TimerMode = "work" | "break";

interface State {
  timeLeft: number;
  isTimerOn: boolean;
  timerMode: TimerMode;
}

const secondToMMSS = (second: number): string => {
  const MM =
    second >= 10 * 60
      ? Math.floor(second / 60).toString()
      : second >= 60
      ? "0" + Math.floor(second / 60).toString()
      : "00";
  const SS = second % 60 >= 10 ? second % 60 : `0${second % 60}`;

  return `${MM}:${SS}`;
};

const App: React.FunctionComponent = () => {
  const [state, setState] = useState<State>({
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: "work",
  });

  return (
    <>
      <div data-testid="timeLeft">{secondToMMSS(state.timeLeft)}</div>
      <button data-testid="timerButton">
        {state.isTimerOn ? "停止" : "開始"}
      </button>
      <div data-testid="timerMode">
        {state.timerMode === "work" ? "作業" : "休憩"}
      </div>
    </>
  );
};

export default App;
