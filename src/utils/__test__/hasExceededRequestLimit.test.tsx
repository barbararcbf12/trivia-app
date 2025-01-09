import { hasExceededRequestLimit } from "../hasExceededRequestLimit";

describe("hasExceededRequestLimit", () => {
  test("returns true when response code is 5", () => {
    expect(hasExceededRequestLimit(5)).toBe(true);
  });

  test("returns false for other response codes", () => {
    expect(hasExceededRequestLimit(1)).toBe(false);
  });
});
