import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import TableSkeleton from "../../components/TableSkeleton";
import { useState } from "react";
import { IInventoryItem } from "../../types";
import { inventoryService } from "../../services/inventoryService";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

// Declare module augmentation for table meta
declare module '@tanstack/react-table' {
  interface TableMeta<TData> {
    deleteItem: (id: string) => void;
    isDeleting: boolean;
  }
}

const columnHelper = createColumnHelper<IInventoryItem>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Product",
    cell: (info) => (
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={info.row.original.image || "https://via.placeholder.com/64"} alt={info.getValue()} />
          </div>
        </div>
        <div>
          <div className="font-bold">{info.getValue()}</div>
          <div className="text-sm opacity-50">{info.row.original.supplier}</div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("quantity", {
    header: () => "Quantity",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("supplier", {
    header: () => "Supplier",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => `${info.getValue()}`,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: (info) => (
      <th className="text-center">
        <Link
          to={`/manageProduct/${info.row.original._id}`}
          className="btn btn-ghost btn-xs"
        >
          details
        </Link>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => info.table.options.meta?.deleteItem(info.row.original._id)}
          disabled={info.table.options.meta?.isDeleting}
        >
          delete
        </button>
      </th>
    ),
  }),
];

const ManageInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'quantity' | 'createdAt' | 'updatedAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const queryClient = useQueryClient();

  const { data: inventoryResponse, isLoading } = useQuery({
    queryKey: ["manageItems", page, limit, sortBy, sortOrder, category],
    queryFn: async () => {
      return await inventoryService.getAllItems({
        page,
        limit,
        sortBy,
        sortOrder,
        category: category || undefined
      });
    },
    staleTime: 300000, // 5 minutes
  });

  // httpClient returns either { data, meta } or array depending on endpoint
  const inventoryItems = (inventoryResponse as any)?.data || [];
  const meta = (inventoryResponse as any)?.meta;

  const deleteMutation = useMutation({
    mutationFn: (id: string) => inventoryService.deleteItem(id),
    onSuccess: () => {
      toast.success("Item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["manageItems"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete item"
      );
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate(id);
    }
  };

  const table = useReactTable({
    data: inventoryItems || [],
    columns,
    state: {
      globalFilter: searchTerm,
      sorting,
    },
    onGlobalFilterChange: setSearchTerm,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    meta: {
      deleteItem: handleDelete,
      isDeleting: deleteMutation.isPending,
    },
  });


  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold">Manage Inventory</h1>
            <p className="opacity-70">
              Track and manage your product inventory
            </p>
            {meta && (
              <p className="text-sm mt-1">
                Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} items
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full sm:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select select-bordered w-full sm:w-auto"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Accessories">Accessories</option>
            </select>
            <select
              className="select select-bordered w-full sm:w-auto"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="quantity-asc">Quantity Low-High</option>
              <option value="quantity-desc">Quantity High-Low</option>
            </select>
            <Link to="/addProduct" className="btn btn-primary w-full sm:w-auto">
              Add Product
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            {isLoading ? (
              <TableSkeleton rows={limit} columns={5} />
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder ? null : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : "",
                                  onClick: header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: " 🔼",
                                  desc: " 🔽",
                                }[header.column.getIsSorted() as string] ?? null}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="hover">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                  Page {meta.page} of {meta.totalPages}
                </div>
                <div className="join">
                  <button 
                    className="join-item btn btn-sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    «
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                    let pageNum;
                    if (meta.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= meta.totalPages - 2) {
                      pageNum = meta.totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        className={`join-item btn btn-sm ${
                          page === pageNum ? 'btn-active' : ''
                        }`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    className="join-item btn btn-sm"
                    onClick={() => setPage(Math.min(meta.totalPages, page + 1))}
                    disabled={page === meta.totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageInventory;