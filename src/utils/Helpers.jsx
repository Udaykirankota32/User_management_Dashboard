import { DEPARTMENTS } from "./constants";

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

export const generateTempId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};