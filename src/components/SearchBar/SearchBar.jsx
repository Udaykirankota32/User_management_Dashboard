// SearchBar.jsx
// Handles the search input and the filter trigger button.
// Kept separate from App.jsx to keep the root component clean.

import { FiSearch, FiX, FiSliders } from "react-icons/fi";
import styles from "./SearchBar.module.css";

const SearchBar = ({ searchQuery, onSearchChange, onFilterClick, activeFilters }) => {

  // Count how many filters are currently active so we can show a badge
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className={styles.wrapper}>

      <div className={styles.searchBox}>
        <FiSearch className={styles.searchIcon} />
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
            <FiX size={14} />
          </button>
        )}
      </div>

      <button className={styles.filterBtn} onClick={onFilterClick}>
        <FiSliders size={14} />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className={styles.filterBadge}>{activeFilterCount}</span>
        )}
      </button>

    </div>
  );
};

export default SearchBar;