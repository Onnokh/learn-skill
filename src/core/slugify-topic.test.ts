import { describe, expect, it } from "vitest";

import { slugifyTopic } from "./slugify-topic";

describe("slugifyTopic", () => {
  it("slugifies simple words", () => {
    expect(slugifyTopic("zod schema")).toBe("zod-schema");
  });

  it("slugifies separators and casing", () => {
    expect(slugifyTopic("Zod/Schema")).toBe("zod-schema");
  });

  it("falls back when empty after normalization", () => {
    expect(slugifyTopic("---")).toBe("skill");
  });
});
