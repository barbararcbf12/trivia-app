import { getOptions } from "../getOptions";

describe("getOptions", () => {
  test("returns shuffled options for non-boolean questions", () => {
    const options = getOptions("multiple", "Paris", ["Berlin", "London", "Rome"]);
    expect(options).toHaveLength(4);
    expect(options).toContain("Paris");
    expect(options).toContain("Berlin");
  });

  test("returns ['Correct', 'Incorrect'] for boolean questions", () => {
    expect(getOptions("boolean", "Correct", ["Incorrect"])).toEqual(["Correct", "Incorrect"]);
  });
});
