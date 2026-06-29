// UserCard.jsx
// Mobile-only card layout for each user.
// Hidden on desktop via CSS — shown only on small screens.

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getInitials } from "../../utils/helpers_temp";
import styles from "./UserCard.module.css";

const DEPARTMENT_BADGE_MAP = {
  IT: "badgeIT",
  Engineering: "badgeEng",
  Sales: "badgeSales",
  HR: "badgeHR",
  Marketing: "badgeMkt",
};

const AVATAR_COLORS = ["avPurple", "avAmber", "avRed", "avPink", "avGreen"];

const UserCard = ({ user, index, onEdit, onDelete }) => {
  const initials = getInitials(user.firstName, user.lastName);
  const avatarClass = AVATAR_COLORS[user.id % AVATAR_COLORS.length];
  const badgeClass = DEPARTMENT_BADGE_MAP[user.department] || "badgeHR";

  return (
    <div className={styles.card}>

      <div className={styles.cardTop}>
        <div className={styles.userInfo}>
          {/* Avatar circle with initials */}
          <div className={`${styles.avatar} ${styles[avatarClass]}`}>
            {initials}
          </div>
          <div className={styles.nameBlock}>
            <span className={styles.fullName}>
              {user.firstName} {user.lastName}
            </span>
            <span className={styles.email}>{user.email}</span>
          </div>
        </div>

        {/* Row number badge on the right */}
        <span className={styles.rowNum}>#{index + 1}</span>
      </div>

      <div className={styles.cardBottom}>
        {/* Department badge */}
        <span className={`${styles.badge} ${styles[badgeClass]}`}>
          {user.department}
        </span>

        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={() => onEdit(user)}
            aria-label={`Edit ${user.firstName}`}
          >
            <FiEdit2 size={13} />
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(user)}
            aria-label={`Delete ${user.firstName}`}
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserCard;