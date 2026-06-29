// ConfirmDelete.jsx
// Safety modal that prevents accidental deletions.
// Shows the target user's full name so the admin
// is always certain about who they're deleting.

import styles from "./ConfirmDelete.module.css";

const ConfirmDelete = ({ user, onConfirm, onCancel }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >

        <div className={styles.iconWrapper}>
          <span className={styles.icon}>🗑</span>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>Delete user</h2>
          <p className={styles.message}>
            Are you sure you want to delete{" "}
            <span className={styles.userName}>{fullName}</span>?
            This action cannot be undone.
          </p>
        </div>

        {/* User details card so admin can double-check before confirming */}
        <div className={styles.userCard}>
          <div className={styles.userInfo}>
            <span className={styles.userLabel}>Name</span>
            <span className={styles.userValue}>{fullName}</span>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userLabel}>Email</span>
            <span className={styles.userValue}>{user.email}</span>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userLabel}>Department</span>
            <span className={styles.userValue}>{user.department}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.cancelBtn}
            onClick={onCancel}
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            aria-label={`Confirm deletion of ${fullName}`}
          >
            Yes, delete user
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDelete;