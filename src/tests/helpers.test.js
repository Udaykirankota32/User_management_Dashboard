// helpers.test.js
// Unit tests for data mapping and utility helper functions.

import { describe, it, expect } from "vitest";
import { mapApiUserToLocal, getInitials, capitalizeFirst } from "../utils/helpers";

describe("mapApiUserToLocal", () => {

  it("correctly splits full name into firstName and lastName", () => {
    const apiUser = { id: 1, name: "Leanne Graham", email: "leanne@april.biz" };
    const result = mapApiUserToLocal(apiUser);
    expect(result.firstName).toBe("Leanne");
    expect(result.lastName).toBe("Graham");
  });

  it("handles single word names gracefully", () => {
    const apiUser = { id: 1, name: "Cher", email: "cher@example.com" };
    const result = mapApiUserToLocal(apiUser);
    expect(result.firstName).toBe("Cher");
    expect(result.lastName).toBe("");
  });

  it("assigns a department based on user id", () => {
    const apiUser = { id: 1, name: "Leanne Graham", email: "leanne@april.biz" };
    const result = mapApiUserToLocal(apiUser);
    expect(result.department).toBeTruthy();
  });

  it("preserves the user id and email", () => {
    const apiUser = { id: 5, name: "Leanne Graham", email: "leanne@april.biz" };
    const result = mapApiUserToLocal(apiUser);
    expect(result.id).toBe(5);
    expect(result.email).toBe("leanne@april.biz");
  });

});

describe("getInitials", () => {

  it("returns uppercase initials from first and last name", () => {
    expect(getInitials("Leanne", "Graham")).toBe("LG");
  });

  it("handles empty strings without crashing", () => {
    expect(getInitials("", "")).toBe("");
  });

  it("handles single name correctly", () => {
    expect(getInitials("Leanne", "")).toBe("L");
  });

});

describe("capitalizeFirst", () => {

  it("capitalizes the first letter", () => {
    expect(capitalizeFirst("hello")).toBe("Hello");
  });

  it("lowercases the rest of the string", () => {
    expect(capitalizeFirst("hELLO")).toBe("Hello");
  });

  it("returns empty string for falsy input", () => {
    expect(capitalizeFirst("")).toBe("");
  });

});