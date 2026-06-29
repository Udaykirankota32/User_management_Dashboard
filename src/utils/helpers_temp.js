// helpers.js
// General-purpose utility functions shared across the application.
// Kept here to avoid duplicating logic in individual components.

import { DEPARTMENTS } from "./constants_temp";

// Maps a raw API user object to our internal user shape.
// The API returns a single `name` field, so we split it into firstName and lastName.
// Department is not provided by the API, so we derive a consistent one using the user's id.
export const mapApiUserToLocal = (user) => {
  const parts = user.name.split(" ");
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  const department = DEPARTMENTS[user.id % DEPARTMENTS.length];

  return {
    id: user.id,
    firstName,
    lastName,
    email: user.email,
    department,
  };
};

// JSONPlaceholder always returns id:11 for POST responses,
// so we generate a temporary unique id for locally added users.
export const generateTempId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// Capitalizes the first letter of a string — used for display formatting.
export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Derives initials from firstName and lastName for the avatar circle.
export const getInitials = (firstName, lastName) => {
  const first = firstName?.charAt(0).toUpperCase() || "";
  const last = lastName?.charAt(0).toUpperCase() || "";
  return `${first}${last}`;
};