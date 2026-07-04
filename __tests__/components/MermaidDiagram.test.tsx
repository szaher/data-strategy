import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MermaidDiagram from "@/components/MermaidDiagram";

vi.mock("mermaid", () => ({
  default: {
    initialize: vi.fn(),
    run: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: "<svg>mock</svg>" }),
  },
}));

describe("MermaidDiagram", () => {
  afterEach(() => {
    cleanup();
  });

  it("provides an accessible label and text alternative", async () => {
    const chart = "graph TD; A-->B;";
    const fallback = "A flows to B.";
    render(<MermaidDiagram chart={chart} fallback={fallback} />);

    expect(screen.getByRole("img", { name: fallback })).toBeDefined();
    expect(await screen.findByText(fallback)).toBeDefined();
  });

  it("renders with an accessible role and aria-label", () => {
    const chart = "graph TD; A-->B;";
    const fallback = "A flows to B.";
    render(<MermaidDiagram chart={chart} fallback={fallback} />);

    const imgContainer = screen.getByRole("img", { name: fallback });
    expect(imgContainer).toBeDefined();
    expect(imgContainer.getAttribute("aria-label")).toBe(fallback);
  });

  it("keeps sr-only fallback text after SVG renders", async () => {
    const chart = "graph TD; A-->B;";
    const fallback = "A flows to B.";
    render(<MermaidDiagram chart={chart} fallback={fallback} />);

    await screen.findByText("mock");

    const allFallback = screen.getAllByText(fallback);
    const srOnly = allFallback.find(
      (el) => el.tagName === "P" && el.className.includes("sr-only"),
    );
    expect(srOnly).toBeDefined();
  });
});
