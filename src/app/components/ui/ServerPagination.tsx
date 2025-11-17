"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface PaginationProps {
  items: any[];
  countOfPage?: number;
  currPage: number;
  setCurrPage: (page: number) => void;
}

const ServerPagination = ({
  items = [],
  countOfPage = 12,
  currPage,
  setCurrPage,
}: PaginationProps) => {
  const totalPage = Math.ceil(items.length / countOfPage);
  const maxVisiblePages = 5;
  const [pageInput, setPageInput] = useState("");
  const [inputError, setInputError] = useState(false);

  function setPage(idx: number) {
    if (idx <= 0 || idx > totalPage) return;
    setCurrPage(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Reset error state
    setInputError(false);

    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = parseInt(value);

      // Prevent entering numbers greater than totalPage
      if (value === "" || (numValue >= 1 && numValue <= totalPage)) {
        setPageInput(value);
      }
      // If user tries to enter a number > totalPage, cap it at totalPage
      else if (numValue > totalPage) {
        setPageInput(totalPage.toString());
        setInputError(true);
      }
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= totalPage) {
      setPage(pageNum);
      setPageInput("");
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePageInputSubmit(e);
    }
  };

  const getVisiblePageNumbers = () => {
    if (totalPage <= maxVisiblePages) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    let start = Math.max(1, currPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPage, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (totalPage <= 1) return null;

  const visiblePages = getVisiblePageNumbers();
  const showFirstEllipsis = visiblePages[0] > 1;
  const showLastEllipsis = visiblePages[visiblePages.length - 1] < totalPage;

  return (
    <div className="flex items-center gap-4">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        <button
          onClick={() => setPage(currPage - 1)}
          disabled={currPage === 1}
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors ${
            currPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:text-gray-500"
          }`}
          aria-label="Previous page"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* First Page */}
        {showFirstEllipsis && (
          <>
            <button
              onClick={() => setPage(1)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors"
            >
              1
            </button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
          </>
        )}

        {/* Page Numbers */}
        {visiblePages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors focus:z-20 focus:outline-offset-0 ${
              currPage === pageNum
                ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
            }`}
            aria-current={currPage === pageNum ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}

        {/* Last Page */}
        {showLastEllipsis && (
          <>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <button
              onClick={() => setPage(totalPage)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors"
            >
              {totalPage}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => setPage(currPage + 1)}
          disabled={currPage === totalPage}
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors ${
            currPage === totalPage
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:text-gray-500"
          }`}
          aria-label="Next page"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      {/* Go to Page Input */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="gotoPage"
          className="text-sm text-gray-600 whitespace-nowrap"
        >
          Go to:
        </label>
        <form onSubmit={handlePageInputSubmit} className="flex items-center">
          <input
            id="gotoPage"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pageInput}
            onChange={handlePageInputChange}
            onKeyDown={handlePageInputKeyDown}
            placeholder={currPage.toString()}
            min="1"
            max={totalPage.toString()}
            className={`w-16 px-2 py-1.5 text-sm text-center border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              inputError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
            }`}
            aria-label={`Go to page (1-${totalPage})`}
            title={`Enter a page number between 1 and ${totalPage}`}
          />
        </form>
        <span className="text-sm text-gray-500">/ {totalPage}</span>
      </div>
    </div>
  );
};

export default ServerPagination;
