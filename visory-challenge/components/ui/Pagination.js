import { usePagination } from "./hooks/usePagination";
import classes from "./Pagination.module.css";

const Pagination = ({ pagesCount, currentPage, onPageChange }) => {
  const numberOfPageToDisplay = 10;
  const paginationRange = usePagination({
    currentPage,
    totalPageCount: pagesCount,
    numberOfPageToDisplay,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div>
      <ul className={classes.pagination}>
        {paginationRange.map((page, index) => {
          if (page === "...") {
            return <span key={index}>&#8230;</span>;
          }
          return (
            <li
              key={index}
              className={
                page === currentPage ? classes.pageItemActive : classes.pageItem
              }
            >
              <a
                className={classes.pageLink}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
