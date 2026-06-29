// pagination.test.js
// Unit tests for pagination slice logic used in App.jsx.
// Tests the math that determines which users appear on each page.

import { describe, it, expect } from "vitest";

// Inline the pagination logic here since it lives inside App.jsx —
// extracting it to a util would be overkill for this scope.
const paginateUsers = (users, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return users.slice(startIndex, startIndex + pageSize);
};

const getTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
};

// Generate a mock user list of given length
const generateUsers = (count) =>
  Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` }));

describe("paginateUsers", () => {

  it("returns the first 5 users on page 1 with pageSize 5", () => {
    const users = generateUsers(10);
    const result = paginateUsers(users, 1, 5);
    expect(result.length).toBe(5);
    expect(result[0].id).toBe(1);
  });

  it("returns the next 5 users on page 2 with pageSize 5", () => {
    const users = generateUsers(10);
    const result = paginateUsers(users, 2, 5);
    expect(result.length).toBe(5);
    expect(result[0].id).toBe(6);
  });

  it("returns remaining users on the last page if less than pageSize", () => {
    const users = generateUsers(7);
    const result = paginateUsers(users, 2, 5);
    expect(result.length).toBe(2);
  });

  it("returns empty array when page exceeds total pages", () => {
    const users = generateUsers(5);
    const result = paginateUsers(users, 3, 5);
    expect(result.length).toBe(0);
  });

});

describe("getTotalPages", () => {

  it("returns correct total pages for even split", () => {
    expect(getTotalPages(10, 5)).toBe(2);
  });

  it("rounds up when users don't divide evenly", () => {
    expect(getTotalPages(11, 5)).toBe(3);
  });

  it("returns 1 when total items is less than page size", () => {
    expect(getTotalPages(3, 5)).toBe(1);
  });

  it("returns 0 when there are no users", () => {
    expect(getTotalPages(0, 5)).toBe(0);
  });

});