import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
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
import { useState } from "react";

// Declare module augmentation for table meta
declare module "@tanstack/react-table" {
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
            <img src={info.row.original.image} alt={info.getValue()} />
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
          onClick={() =>
            info.table.options.meta?.deleteItem(info.row.original._id)
          }
          disabled={info.table.options.meta?.isDeleting}
        >
          delete
        </button>
      </th>
    ),
  }),
];

const MyProducts = () => {
  const queryClient = useQueryClient();
  const email = localStorage.getItem("email");
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: myItems, isLoading } = useQuery<IInventoryItem[]>({
    queryKey: ["myItems", email],
    queryFn: async () => {
      if (!email) {
        throw new Error("User email not found");
      }
      const res = await inventoryService.getUserItems(email);
      return res.data;
    },
    enabled: !!email,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => inventoryService.deleteItem(id),
    onSuccess: () => {
      toast.success("Item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["myItems"] });
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
    data: myItems || [],
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

  if (isLoading) {
    return <LoadingSpinner message="Loading your products..." />;
  }

  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">My Products</h1>
            <p className="text-sm sm:text-base opacity-70 mt-1">
              Manage your personal inventory
            </p>
          </div>
          <Link to="/addProduct" className="btn btn-primary w-full sm:w-auto">
            Add New Product
          </Link>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
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
                                onClick:
                                  header.column.getToggleSortingHandler(),
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProducts;
