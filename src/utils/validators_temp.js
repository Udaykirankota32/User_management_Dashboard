// validators.js
// Centralized form validation logic.
// Returns an errors object — empty means the form is valid.
// Keeping this separate from components enforces the DRY principle
// and makes it easy to unit test in isolation.

export const validateUserForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (formData.firstName.trim().length < 2) {
    // Single character names are almost always accidental input
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    // Basic RFC-style check — catches obvious typos like missing @ or domain
    errors.email = "Invalid email format";
  }

  if (!formData.department.trim()) {
    errors.department = "Department is required";
  }

  return errors;
};