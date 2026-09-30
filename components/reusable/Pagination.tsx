const Pagination = ({ items, pageSize, currentPage, onPageChange }: any) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <div className="flex gap-2 justify-center items-center pt-8">
        {pages.map((page) => (
          <button
            onClick={(e) => onPageChange(page)}
            key={page}
            className={
              page === currentPage
                ? "bg-white text-primary px-3 py-1 rounded-full"
                : "border-2 text-white px-3 py-1 rounded-full hover:bg-white hover:text-primary"
            }
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
