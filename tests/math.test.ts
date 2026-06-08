import { describe, expect, it } from "vitest";

import { add } from "../src/math.js";

describe("add", () => {
  it("adds positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("adds negative and decimal numbers", () => {
    expect(add(-1.5, 0.25)).toBe(-1.25);
  });

  it("rejects non-finite numbers", () => {
    expect(() => add(Number.POSITIVE_INFINITY, 1)).toThrow(TypeError);
    expect(() => add(Number.NaN, 1)).toThrow(TypeError);
  });
});
