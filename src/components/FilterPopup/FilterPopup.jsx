// FilterPopup.jsx
// Modal popup for filtering users by specific fields.
// Filters are applied only when the user clicks "Apply" —
// not on every keystroke, unlike the search bar.

import { useState } from "react";
import { DEPARTMENTS } from "../../utils/constants";
import styles from "./FilterPopup.css";

const FilterPopup = ({ filters, onApply, onClose }) => {

  // Local state mirrors the current filters so we can
  // edit without affecting the table until Apply is clicked
  const [localFilters, setLocalFilters] = useState({ ...filters });

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  // Clears all filter fields back to empty strings
  const handleReset = () => {
    const cleared = { firstName: "", lastName: "", email: "", department: "" };
    setLocalFilters(cleared);
    onApply(cleared);
  };

  const hasActiveFilters = Object.values(localFilters).some(Boolean);

  return (
    // Clicking the backdrop closes the popup
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.popup}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Filter users</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close filter popup"
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>

          <div className={styles.field}>
            <label className={styles.label}>First name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Leanne"
              value={localFilters.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Last name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Graham"
              value={localFilters.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. user@email.com"
              value={localFilters.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Department</label>
            {/* Dropdown is cleaner than a text field for fixed options */}
            <select
              className={styles.select}
              value={localFilters.department}
              onChange={(e) => handleChange("department", e.target.value)}
            >
              <option value="">All departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

        </div>

        <div className={styles.footer}>
          {hasActiveFilters && (
            <button className={styles.resetBtn} onClick={handleReset}>
              Reset all
            </button>
          )}
          <button className={styles.applyBtn} onClick={handleApply}>
            Apply filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterPopup;