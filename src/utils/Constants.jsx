// constants.js
// Central place for all app-wide constants.
// Changing a value here reflects everywhere — no magic strings scattered around.

// Base API endpoint for all user-related requests
export const API_URL = "https://jsonplaceholder.typicode.com/users";

// Default departments assigned to users since the API doesn't provide this field
export const DEPARTMENTS = ["IT", "Engineering", "Sales", "HR", "Marketing"];

// Options shown in the page size dropdown
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

// Field keys used for sorting — matches the keys in our internal user object
export const SORT_FIELDS = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  DEPARTMENT: "department",
};

// Sort direction toggles
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};