import React from "react";

const Pagination = ({ pageNo, handlePrevious, handleNext }) => {
  return (
    <div className="mt-10 mb-6 flex items-center justify-center gap-3">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={pageNo === 1}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
          pageNo === 1
            ? "bg-slate-900/40 text-gray-600 border border-slate-800/40 cursor-not-allowed"
            : "bg-slate-900 hover:bg-yellow-500 hover:text-slate-950 text-gray-200 border border-slate-700 shadow-md"
        }`}
      >
        <i className="fa-solid fa-arrow-left text-xs"></i>
        <span>Prev</span>
      </button>

      {/* Page Badge */}
      <div className="w-10 h-10 rounded-xl bg-yellow-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md shadow-yellow-500/20">
        {pageNo}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-yellow-500 hover:text-slate-950 text-gray-200 border border-slate-700 transition-all duration-200 cursor-pointer shadow-md"
      >
        <span>Next</span>
        <i className="fa-solid fa-arrow-right text-xs"></i>
      </button>
    </div>
  );
};

export default Pagination;
