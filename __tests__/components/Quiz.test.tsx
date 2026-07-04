import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Quiz from "@/components/Quiz";
import type { QuizQuestion } from "@/types";

const questions: QuizQuestion[] = [
  {
    question: "What does GIL stand for?",
    options: ["Global Interpreter Lock", "General Input Layer", "Graphics Interface Library"],
    correctIndex: 0,
    explanation: "The GIL is Python's Global Interpreter Lock.",
  },
];

describe("Quiz", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the question", () => {
    render(<Quiz questions={questions} onComplete={vi.fn()} />);
    expect(screen.getByText("What does GIL stand for?")).toBeDefined();
  });

  it("shows all options", () => {
    render(<Quiz questions={questions} onComplete={vi.fn()} />);
    expect(screen.getByText("Global Interpreter Lock")).toBeDefined();
    expect(screen.getByText("General Input Layer")).toBeDefined();
  });

  it("uses radio controls and shows feedback before completion", () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} />);
    const option = screen.getByRole("radio", { name: "Global Interpreter Lock" });
    fireEvent.click(option);
    expect((option as HTMLInputElement).checked).toBe(true);
    fireEvent.click(screen.getByText("Submit"));

    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByText("(Correct)")).toBeDefined();
    expect(screen.getByText("Finish")).toBeDefined();

    fireEvent.click(screen.getByText("Finish"));
    expect(onComplete).toHaveBeenCalledWith(1);
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toContain("Quiz Complete");
  });

  it("provides text feedback and a live announcement before the quiz is complete", () => {
    const twoQuestions: QuizQuestion[] = [
      ...questions,
      {
        question: "Which keyword defines a function?",
        options: ["class", "def"],
        correctIndex: 1,
        explanation: "Python functions are defined with def.",
      },
    ];

    render(<Quiz questions={twoQuestions} onComplete={vi.fn()} />);
    fireEvent.click(screen.getByRole("radio", { name: "Global Interpreter Lock" }));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("(Correct)")).toBeDefined();
    const liveRegion = screen.getByText("Correct. The GIL is Python's Global Interpreter Lock.");
    expect(liveRegion.getAttribute("aria-live")).toBe("polite");
  });

  it("shows feedback on the last question before showing the completion panel", () => {
    const onComplete = vi.fn();
    const twoQuestions: QuizQuestion[] = [
      ...questions,
      {
        question: "Which keyword defines a function?",
        options: ["class", "def"],
        correctIndex: 1,
        explanation: "Python functions are defined with def.",
      },
    ];

    render(<Quiz questions={twoQuestions} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole("radio", { name: "Global Interpreter Lock" }));
    fireEvent.click(screen.getByText("Submit"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByRole("radio", { name: "def" }));
    fireEvent.click(screen.getByText("Submit"));

    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByText("(Correct)")).toBeDefined();
    expect(screen.getByText("Finish")).toBeDefined();
    expect(screen.queryByRole("alert")).toBeNull();

    fireEvent.click(screen.getByText("Finish"));
    expect(onComplete).toHaveBeenCalledWith(2);
    expect(screen.getByRole("alert").textContent).toContain("Quiz Complete");
  });
});
