import { useMemo } from "react";
export const usePagination = ({
  totalPageCount,
  siblingCount = 1,
  currentPage,
  numberOfPageToDisplay,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return [...Array(totalPageCount).keys()].map((i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftRange = [...Array(numberOfPageToDisplay).keys()].map(
        (i) => i + 1
      );

      return [...leftRange, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = [...Array(rightItemCount).keys()].map(
        (i) => i + totalPageCount - rightItemCount + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = [...Array(numberOfPageToDisplay).keys()].map(
        (i) => i + leftSiblingIndex
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [totalPageCount, siblingCount, currentPage, numberOfPageToDisplay]);

  return paginationRange;
};
