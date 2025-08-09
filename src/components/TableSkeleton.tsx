const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, i) => (
              <th key={i}>
                <div className="h-4 bg-base-300 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <td key={colIndex}>
                  {colIndex === 0 ? (
                    // Product column with avatar
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-base-300 animate-pulse"></div>
                      </div>
                      <div>
                        <div className="h-4 bg-base-300 rounded animate-pulse w-24 mb-1"></div>
                        <div className="h-3 bg-base-300 rounded animate-pulse w-16"></div>
                      </div>
                    </div>
                  ) : colIndex === columns - 1 ? (
                    // Actions column
                    <div className="flex gap-2 justify-center">
                      <div className="h-6 bg-base-300 rounded animate-pulse w-12"></div>
                      <div className="h-6 bg-base-300 rounded animate-pulse w-12"></div>
                    </div>
                  ) : (
                    // Regular data columns
                    <div className="h-4 bg-base-300 rounded animate-pulse w-16"></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
