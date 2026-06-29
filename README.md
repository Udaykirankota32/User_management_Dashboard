# User Management Dashboard

A responsive React application that allows administrators to perform full CRUD operations on user data using the JSONPlaceholder REST API.

---

## Live Demo


> Add your deployed URL here after hosting on Vercel or Netlify

---

## Screen Recording

> Add your Loom / Google Drive / YouTube link here

---
## Figma Ui

https://www.figma.com/design/21aGf5sdEh9sUNu70oX1QW/Untitled?node-id=0-1&p=f&t=8xlJI5y8a4slJTbg-0

---

## Project Overview

This dashboard allows administrators to:

- View all users in a structured table (desktop) or card layout (mobile)
- Search users in real-time by name or email
- Filter users by first name, last name, email, or department
- Sort users by any column in ascending or descending order
- Add new users via a validated modal form
- Edit existing users with pre-populated fields
- Delete users with a safety confirmation modal
- Navigate through paginated results with flexible page size controls

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | UI component framework |
| Vite | Build tool and dev server |
| Axios | HTTP requests to JSONPlaceholder API |
| CSS Modules | Scoped component-level styling |
| react-icons | Clean SVG icon set (Feather icons) |
| Vitest | Unit testing framework |
| @testing-library/react | React component testing utilities |

---

## Installation & Setup

### Prerequisites
- Node.js v18+
- npm

### Steps

```bash
# Clone the repository
git clone https://github.com/your-username/user-management-dashboard.git

# Navigate into the project
cd user-management-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser at `http://localhost:5173`

---

## Running Tests

```bash
npm run test
```

Tests cover:
- Form validation logic (`validators.test.js`)
- Data mapping and helper functions (`helpers.test.js`)
- Pagination slice math (`pagination.test.js`)

---

## Folder Structure
src/

├── api/

│   └── userService.js         # Axios API calls (GET, POST, PUT, DELETE)

├── components/

│   ├── Header/                # Top bar with branding and Add User button

│   ├── SearchBar/             # Search input and filter trigger

│   ├── UserTable/             # Table (desktop) and card (mobile) layouts

│   ├── FilterPopup/           # Multi-field filter modal

│   ├── Pagination/            # Page controls and page size selector

│   ├── UserForm/              # Add and Edit user modal

│   └── ConfirmDelete/         # Delete confirmation modal

├── hooks/

│   └── useUsers.js            # Custom hook managing all CRUD state

├── utils/

│   ├── constants.js           # App-wide constants (API URL, departments)

│   ├── validators.js          # Form validation logic

│   └── helpers.js             # Data mapping and utility functions

├── tests/

│   ├── setup.js               # Vitest setup with jest-dom matchers

│   ├── validators.test.js     # Validator unit tests

│   ├── helpers.test.js        # Helper function unit tests

│   └── pagination.test.js     # Pagination logic unit tests

├── styles/

│   └── global.css             # Global dark theme CSS variables

├── App.jsx                    # Root component with shared state

└── main.jsx                   # Application entry point


-----

---

## Engineering Assumptions

### Name Splitting
The JSONPlaceholder API returns a single `name` field (e.g. `"Leanne Graham"`).
Since the assignment requires separate `firstName` and `lastName` columns, the name string is split at the first space:

```js
const parts = user.name.split(" ");
const firstName = parts[0] || "";
const lastName = parts.slice(1).join(" ") || "";
```

### Department Assignment
The API does not provide a `department` field. A department is assigned deterministically using the user's `id` modulo the number of available departments:

```js
const department = DEPARTMENTS[user.id % DEPARTMENTS.length];
```

This ensures each user always gets the same department across re-renders and page refreshes.

### JSONPlaceholder Limitations
JSONPlaceholder is a mock read-only API. POST, PUT, and DELETE requests return simulated success responses but do not persist data. All mutations are reflected in local React state only.

### Temporary IDs
Since JSONPlaceholder always returns `id: 11` for POST responses, newly added users are assigned a unique temporary ID:

```js
export const generateTempId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};
```

---

## Challenges Faced

### JSONPlaceholder Read-Only Nature
The API simulates responses but does not actually persist changes. This was handled by updating local React state immediately after every successful API response, keeping the UI in sync without relying on backend persistence.

### Name Field Mapping
Splitting names at the first space works for most cases but can produce unexpected results for names with prefixes like `"Mrs. Dennis Schulist"`. This is documented as a known limitation of the mock API's data structure.

### CSS Modules Dark Theme
Getting CSS variables to work consistently across all scoped module files required defining all tokens in a single `global.css` file and importing it once at the root `main.jsx` level.

---

## Future Improvements

- Add a real backend (Node.js + Express + MongoDB) for true data persistence
- Implement user authentication and role-based access control
- Add advanced sorting with multi-column support
- Add export to CSV functionality
- Add skeleton loaders per row instead of a single spinner
- Add toast notifications for successful CRUD operations


-------

## Author

**Uday Kiran Kota**
B.Tech Information Technology — 2026 Batch