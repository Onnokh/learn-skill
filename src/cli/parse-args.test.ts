import { describe, expect, it } from "vitest";

import { parseArgs } from "./parse-args";

describe("parseArgs", () => {
  it("uses all as default platform", () => {
    expect(parseArgs([])).toEqual({
      platform: "all",
      check: false,
      dryRun: false,
      help: false,
    });
  });

  it("parses platform flag", () => {
    expect(parseArgs(["--platform", "cursor"]).platform).toBe("cursor");
    expect(parseArgs(["--platform=opencode"]).platform).toBe("opencode");
    expect(parseArgs(["--platform", "claude"]).platform).toBe("claude");
    expect(parseArgs(["--platform", "both"]).platform).toBe("all");
  });

  it("parses check and dry-run flags", () => {
    expect(parseArgs(["--check", "--dry-run"])).toMatchObject({
      check: true,
      dryRun: true,
    });
  });

  it("accepts init alias token", () => {
    expect(parseArgs(["init"])).toMatchObject({ platform: "all" });
  });

  it("throws on invalid platform", () => {
    expect(() => parseArgs(["--platform", "foo"])).toThrow("Invalid platform");
  });

  it("throws on unknown argument", () => {
    expect(() => parseArgs(["--wat"])).toThrow("Unknown argument");
  });
});
