type HabitsPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export function HabitsPagination({ page, totalPages, total, limit, onPageChange }: HabitsPaginationProps) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-text-secondary">
        Showing {start} to {end} of {total} habits
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-text-secondary transition hover:text-text-primary disabled:opacity-40"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`h-8 w-8 rounded-lg text-sm transition ${
              pageNumber === page
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-text-secondary transition hover:text-text-primary disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}
