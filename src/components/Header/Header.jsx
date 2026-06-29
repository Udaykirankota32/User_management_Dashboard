// Header.jsx
// Sticky top navigation bar with app branding and the Add User button.
// Kept simple — only responsible for display and triggering onAddUser.

import styles from "./Header.module.css";

const Header = ({ onAddUser }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        <div className={styles.brand}>
          <div className={styles.logo}>UM</div>
          <div>
            <h1 className={styles.title}>User Management</h1>
            <p className={styles.subtitle}>Manage your team members</p>
          </div>
        </div>

        <button
          className={styles.addBtn}
          onClick={onAddUser}
          aria-label="Add new user"
        >
          + Add User
        </button>

      </div>
    </header>
  );
};

export default Header;