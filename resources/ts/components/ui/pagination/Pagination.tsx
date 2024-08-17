import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page
              ? "bg-primary text-primary-content"
              : "bg-base-200 text-base-content hover:bg-base-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
