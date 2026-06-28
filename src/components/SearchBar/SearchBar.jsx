// SearchBar.jsx
// Handles the search input and the filter trigger button.
// Kept separate from App.jsx to keep the root component clean.
import { FaReact } from "react-icons/fa";

import styles from "./SearchBar.module.css";

const SearchBar = ({ searchQuery, onSearchChange, onFilterClick, activeFilters }) => {

  // Count how many filters are currently active so we can show a badge
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>&#128269;</span>
        <input
          type="text"
          className={styles.input}
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {/* Clear button only shows when there's an active query */}
        {searchQuery && (
          <button
            className={styles.clearBtn}
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <button className={styles.filterBtn} onClick={onFilterClick}>
        <FaReact className={styles.filterIcon} />
        <span>Filters</span>

        {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
        )}
    </button>
    </div>
  );
};

export default SearchBar;