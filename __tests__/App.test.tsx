import React from "react";
import { screen, render } from "@testing-library/react";
import App from "../src/App";

describe("initial render", () => {
  test("「25:00」が描画されていること", () => {
    render(<App />);
    expect(screen.getByTestId("timeLeft")).toHaveTextContent("25:00");
  });
  test("「開始」が描画されていること", () => {
    render(<App />);
    expect(screen.getByTestId("timerButton")).toHaveTextContent("開始");
  });
  test("「作業」が描画されていること", () => {
    render(<App />);
    expect(screen.getByTestId("timerMode")).toHaveTextContent("作業");
  });
});
