// UserRow.jsx
// Renders a single user row inside the table.
// Avatar color cycles through 5 options based on user id
// so each user consistently gets the same color.

import { getInitials } from "../../utils/helpers";
import styles from "./UserRow.css";

// Maps department names to CSS module class names for badge styling
const DEPARTMENT_BADGE_MAP = {
  IT: "badgeIT",
  Engineering: "badgeEng",
  Sales: "badgeSales",
  HR: "badgeHR",
  Marketing: "badgeMkt",
};

// Avatar color cycles through these 5 classes based on user id
const AVATAR_COLORS = ["avPurple", "avAmber", "avRed", "avPink", "avGreen"];

const UserRow = ({ user, index, onEdit, onDelete }) => {
  const initials = getInitials(user.firstName, user.lastName);
  const avatarClass = AVATAR_COLORS[user.id % AVATAR_COLORS.length];
  const badgeClass = DEPARTMENT_BADGE_MAP[user.department] || "badgeHR";

  return (
    <tr className={`${styles.row} ${index % 2 === 0 ? "" : styles.rowAlt}`}>

      <td className={styles.td} style={{ width: "48px" }}>
        <span className={styles.rowIndex}>{index + 1}</span>
      </td>

      <td className={styles.td} style={{ width: "180px" }}>
        <div className={styles.nameCell}>
          <div className={`${styles.avatar} ${styles[avatarClass]}`}>
            {initials}
          </div>
          <span className={styles.firstName}>{user.firstName}</span>
        </div>
      </td>

      <td className={styles.td} style={{ width: "150px" }}>
        <span className={styles.cellText}>{user.lastName}</span>
      </td>

      <td className={styles.td} style={{ width: "220px" }}>
        <span className={styles.emailText}>{user.email}</span>
      </td>

      <td className={styles.td} style={{ width: "130px" }}>
        <span className={`${styles.badge} ${styles[badgeClass]}`}>
          {user.department}
        </span>
      </td>

      <td className={styles.td} style={{ width: "110px" }}>
        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={() => onEdit(user)}
            aria-label={`Edit ${user.firstName} ${user.lastName}`}
          >
            ✏ Edit
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(user)}
            aria-label={`Delete ${user.firstName} ${user.lastName}`}
          >
            🗑
          </button>
        </div>
      </td>

    </tr>
  );
};

export default UserRow;