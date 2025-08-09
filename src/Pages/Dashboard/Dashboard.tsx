import React from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/dashboardService";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardService.getDashboardStats,
    staleTime: 300000, // 5 minutes
  });

  // Handle errors using useEffect
  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load dashboard stats");
    }
  }, [error]);

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <section className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Dashboard</h1>
          <p className="text-xl opacity-70">Overview of your inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="stat bg-base-100 shadow-lg rounded-2xl">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="stat-title">Total Items</div>
            <div className="stat-value text-primary">{stats?.totalItems || 0}</div>
            <div className="stat-desc">Products in inventory</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-2xl">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
            <div className="stat-title">Total Quantity</div>
            <div className="stat-value text-secondary">{stats?.totalQuantity || 0}</div>
            <div className="stat-desc">Items in stock</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-2xl">
            <div className="stat-figure text-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20m9-9H3"></path>
              </svg>
            </div>
            <div className="stat-title">Total Value</div>
            <div className="stat-value text-success">${stats?.totalValue?.toFixed(2) || '0.00'}</div>
            <div className="stat-desc">Inventory worth</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-2xl">
            <div className="stat-figure text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div className="stat-title">Low Stock</div>
            <div className="stat-value text-warning">{stats?.lowStockItems || 0}</div>
            <div className="stat-desc">Items below 10 units</div>
          </div>
        </div>

        {/* Category Breakdown */}
        {stats?.categoryCounts && stats.categoryCounts.length > 0 && (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Category Breakdown</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.categoryCounts.map((category) => (
                  <div key={category._id} className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                    <span className="font-semibold">{category._id || 'Uncategorized'}</span>
                    <span className="badge badge-primary badge-lg">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
