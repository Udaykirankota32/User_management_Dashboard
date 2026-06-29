// validators.test.js
// Unit tests for the form validation utility.
// Covers required field checks, length checks, and email format checks.

import { describe, it, expect } from "vitest";
import { validateUserForm } from "../utils/validators";

describe("validateUserForm", () => {

  // Should return no errors for a perfectly valid form
  it("returns empty errors for valid input", () => {
    const result = validateUserForm({
      firstName: "Leanne",
      lastName: "Graham",
      email: "leanne@example.com",
      department: "IT",
    });
    expect(result).toEqual({});
  });

  // First name is required
  it("returns error when firstName is empty", () => {
    const result = validateUserForm({
      firstName: "",
      lastName: "Graham",
      email: "leanne@example.com",
      department: "IT",
    });
    expect(result.firstName).toBe("First name is required");
  });

  // Single character names should fail the minimum length check
  it("returns error when firstName is too short", () => {
    const result = validateUserForm({
      firstName: "L",
      lastName: "Graham",
      email: "leanne@example.com",
      department: "IT",
    });
    expect(result.firstName).toBe("First name must be at least 2 characters");
  });

  // Last name is required
  it("returns error when lastName is empty", () => {
    const result = validateUserForm({
      firstName: "Leanne",
      lastName: "",
      email: "leanne@example.com",
      department: "IT",
    });
    expect(result.lastName).toBe("Last name is required");
  });

  // Email is required
  it("returns error when email is empty", () => {
    const result = validateUserForm({
      firstName: "Leanne",
      lastName: "Graham",
      email: "",
      department: "IT",
    });
    expect(result.email).toBe("Email is required");
  });

  // Email must have proper format
  it("returns error for invalid email format", () => {
    const result = validateUserForm({
      firstName: "Leanne",
      lastName: "Graham",
      email: "not-an-email",
      department: "IT",
    });
    expect(result.email).toBe("Invalid email format");
  });

  // Department is required
  it("returns error when department is empty", () => {
    const result = validateUserForm({
      firstName: "Leanne",
      lastName: "Graham",
      email: "leanne@example.com",
      department: "",
    });
    expect(result.department).toBe("Department is required");
  });

  // Multiple fields invalid at once
  it("returns multiple errors when multiple fields are invalid", () => {
    const result = validateUserForm({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
    expect(Object.keys(result).length).toBe(4);
  });

});