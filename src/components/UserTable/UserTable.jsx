// UserTable.jsx
// Renders table on desktop, switches to card layout on mobile.
// Both views share the same data and callbacks.

import UserRow from "./UserRow";
import UserCard from "./UserCard";
import { SORT_FIELDS, SORT_ORDER } from "../../utils/constants_temp";
import styles from "./UserTable.module.css";

const UserTable = ({ users, sortField, sortOrder, onSort, onEdit, onDelete }) => {

  const getSortIndicator = (field) => {
    if (sortField !== field) return " ↕";
    return sortOrder === SORT_ORDER.ASC ? " ↑" : " ↓";
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found matching your search or filters.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table view */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.th}>#</th>
              <th
                className={`${styles.th} ${styles.sortable}`}
                onClick={() => onSort(SORT_FIELDS.FIRST_NAME)}
              >
                First name
                <span className={styles.sortIcon}>
                  {getSortIndicator(SORT_FIELDS.FIRST_NAME)}
                </span>
              </th>
              <th
                className={`${styles.th} ${styles.sortable}`}
                onClick={() => onSort(SORT_FIELDS.LAST_NAME)}
              >
                Last name
                <span className={styles.sortIcon}>
                  {getSortIndicator(SORT_FIELDS.LAST_NAME)}
                </span>
              </th>
              <th
                className={`${styles.th} ${styles.sortable}`}
                onClick={() => onSort(SORT_FIELDS.EMAIL)}
              >
                Email
                <span className={styles.sortIcon}>
                  {getSortIndicator(SORT_FIELDS.EMAIL)}
                </span>
              </th>
              <th
                className={`${styles.th} ${styles.sortable}`}
                onClick={() => onSort(SORT_FIELDS.DEPARTMENT)}
              >
                Department
                <span className={styles.sortIcon}>
                  {getSortIndicator(SORT_FIELDS.DEPARTMENT)}
                </span>
              </th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className={styles.cardList}>
        {users.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default UserTable;