// UserTable.jsx
// Renders the full table with sortable column headers.
// Sorting logic lives in App.jsx — this component just fires the onSort callback.

import UserRow from "./UserRow";
import { SORT_FIELDS, SORT_ORDER } from "../../utils/constants";
import styles from "./UserTable.css";

const UserTable = ({ users, sortField, sortOrder, onSort, onEdit, onDelete }) => {

  // Helper to show the right sort arrow on the active column
  const getSortIndicator = (field) => {
    if (sortField !== field) return " ↕";
    return sortOrder === SORT_ORDER.ASC ? " ↑" : " ↓";
  };

  return (
    <div className={styles.tableWrapper}>
      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found matching your search or filters.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default UserTable;