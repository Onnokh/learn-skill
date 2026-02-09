import { describe, expect, it } from "vitest";

import { renderSummary } from "./render-summary";

describe("renderSummary", () => {
  it("renders non-check summary", () => {
    expect(
      renderSummary(
        {
          create: 1,
          update: 2,
          noop: 3,
        },
        false,
      ),
    ).toBe("Scaffold complete\nCreated: 1\nUpdated: 2\nUnchanged: 3");
  });

  it("renders check summary with no drift", () => {
    expect(
      renderSummary(
        {
          create: 0,
          update: 0,
          noop: 2,
        },
        true,
      ),
    ).toBe("No drift detected\nCreated: 0\nUpdated: 0\nUnchanged: 2");
  });

  it("renders check summary with drift", () => {
    expect(
      renderSummary(
        {
          create: 1,
          update: 1,
          noop: 0,
        },
        true,
      ),
    ).toBe("Drift detected: 2 file(s)\nCreated: 1\nUpdated: 1\nUnchanged: 0");
  });
});
