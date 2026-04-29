type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}
function Pagination({page, totalPages, onPageChange}: PaginationProps) {
  return (
    <div className="flex gap-4 items-center justify-center mt-20">
            <button
              type="button"
              onClick={()=>onPageChange(page-1)}
              disabled={page<= 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" 
            >
              Previous
          </button>
          {page}
            <button
              type="button"
              onClick={() =>onPageChange(page+1)}
              disabled={page >= totalPages}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" 
            >
              Next
            </button>
          </div>
  )
}

export default Pagination