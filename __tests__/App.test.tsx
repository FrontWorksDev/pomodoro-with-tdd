import React from "react";
import { screen, render, act } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event/";

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

describe("Testing the display after pressing the start button", () => {
  describe("Testing the display immediately after pressing the start button", () => {
    test("「25:00」が描画されていること", () => {
      render(<App />);
      void userEvent.click(screen.getByTestId("timerButton"));
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("25:00");
    });
    test("「停止」が描画されていること", async () => {
      const user = userEvent.setup();
      render(<App />);
      await user.click(screen.getByTestId("timerButton"));
      expect(screen.getByTestId("timerButton")).toHaveTextContent("停止");
    });
    test("「作業」が描画されていること", () => {
      render(<App />);
      void userEvent.click(screen.getByTestId("timerButton"));
      expect(screen.getByTestId("timerMode")).toHaveTextContent("作業");
    });
  });

  describe("Testing the display 999 milliseconds after the start button is pressed", () => {
    test("「25:00」が描画されていること", async () => {
      const user = userEvent.setup({ delay: null });
      jest.useFakeTimers();
      render(<App />);
      await user.click(screen.getByTestId("timerButton"));
      act(() => {
        jest.advanceTimersByTime(999);
      });
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("25:00");
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });

  describe("Testing the display 1000 milliseconds after the start button is pressed", () => {
    test("「24:59」が描画されていること", async () => {
      const user = userEvent.setup({ delay: null });
      jest.useFakeTimers();
      render(<App />);
      await user.click(screen.getByTestId("timerButton"));
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.getByTestId("timeLeft")).toHaveTextContent("24:59");
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });

  describe("Testing the display 2000 milliseconds after the start button is pressed", () => {
    test("「24:58」が描画されていること", async () => {
      const user = userEvent.setup({ delay: null });
      jest.useFakeTimers();
      render(<App />);
      await user.click(screen.getByTestId("timerButton"));
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      await expect(screen.getByTestId("timeLeft")).toHaveTextContent("24:58");
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });

  describe("Testing the display 25 minutes after the start button is pressed", () => {
    test("「00:00」が描画されていること", async () => {
      const user = userEvent.setup({ delay: null });
      jest.useFakeTimers();
      render(<App />);
      await user.click(screen.getByTestId("timerButton"));
      act(() => {
        jest.advanceTimersByTime(25 * 60 * 1000);
      });
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("00:00");
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test("「作業」が描画されていること", async () => {
      const user = userEvent.setup({ delay: null });
      jest.useFakeTimers();
      render(<App />);
      await user.click(screen.getByTestId("timerButton"));
      act(() => {
        jest.advanceTimersByTime(25 * 60 * 1000);
      });
      expect(screen.getByTestId("timerMode")).toHaveTextContent("作業");
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });

  describe("Testing the display 25 minutes + 1 second after the start button is pressed", () => {
    test.todo("「04:59」が描画されていること");
    test.todo("「休憩」が描画されていること");
  });

  describe("Testing the display 25 minutes + 5 minutes + 1 second after the start button is pressed", () => {
    test.todo("「24:59」が描画されていること");
    test.todo("「作業」が描画されていること");
  });
});
