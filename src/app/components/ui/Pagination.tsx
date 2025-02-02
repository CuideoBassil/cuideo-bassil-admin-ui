import React from "react";

// Prop type
type IProps = {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
};

const Pagination = ({ handlePageClick, pageCount }: IProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handlePageClick({ selected: page });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <button
          className={`flex items-center justify-center px-2 border rounded-md cursor-pointer ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-2 border rounded-md ${
          currentPage === 0
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount - 1}
        className={`px-2 border rounded-md ${
          currentPage === pageCount - 1
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
