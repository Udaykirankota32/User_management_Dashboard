// Pagination.jsx
// Controls page navigation and page size selection.
// All slicing logic lives in App.jsx — this component
// only fires callbacks and displays the current state.

import { PAGE_SIZE_OPTIONS } from "../../utils/constants";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {

  // Calculate which user range is currently visible e.g. "Showing 1–5 of 10"
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);

  // Build page number buttons — always show first, last, current, and neighbors
  const getPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (
        pages[pages.length - 1] !== "..."
      ) {
        // Insert ellipsis when there's a gap between page numbers
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles.left}>
        <span className={styles.info}>
          Showing {rangeStart}–{rangeEnd} of {totalItems} users
        </span>

        {/* Page size selector — lets admin control how many rows appear */}
        <select
          className={styles.pageSizeSelect}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      <div className={styles.right}>
        {/* Prev button disabled on first page */}
        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ← Prev
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.pageBtn} ${
                page === currentPage ? styles.activePage : ""
              }`}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        {/* Next button disabled on last page */}
        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>

    </div>
  );
};

export default Pagination;