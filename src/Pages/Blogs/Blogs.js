import React from "react";

const Blogs = () => {
  return (
    <section className="container mx-auto">
      <h2 className="text-4xl font-bold text-center mt-4">Blogs</h2>
      <div className="mt-4">
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW52ZW50b3J5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">What is an inventory?</h2>
            <p>
              The term inventory refers to the raw materials used in production
              as well as the goods produced that are available for sale. A
              company's inventory represents one of the most important assets it
              has because the turnover of inventory represents one of the
              primary sources of revenue generation and subsequent earnings for
              the company's shareholders.
            </p>
            {/* ++++ */}
            <div className="card-actions justify-end">
              <label
                htmlFor="my-modal-3"
                className="btn btn-primary modal-button "
              >
                open full article
              </label>
            </div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">Inventory</h3>
                <p className="py-4">
                  The term inventory refers to the raw materials used in
                  production as well as the goods produced that are available
                  for sale. A company's inventory represents one of the most
                  important assets it has because the turnover of inventory
                  represents one of the primary sources of revenue generation
                  and subsequent earnings for the company's shareholders. There
                  are three types of inventory, including raw materials,
                  work-in-progress, and finished goods. It is categorized as a
                  current asset on a company's balance sheet. KEY TAKEAWAYS
                  Inventory is the raw materials used to produce goods as well
                  as the goods that are available for sale. It is classified as
                  a current asset on a company's balance sheet. The three types
                  of inventory include raw materials, work-in-progress, and
                  finished goods. Inventory is valued in one of three ways,
                  including the first-in, first-out method; the last-in,
                  first-out method; and the weighted average method. Inventory
                  management allows businesses to minimize inventory costs as
                  they create or receive goods on an as-needed basis.
                  Understanding Inventory Inventory is a very important asset
                  for any company. It is defined as the array of goods used in
                  production or finished goods held by a company during its
                  normal course of business. There are three general categories
                  of inventory, including raw materials (any supplies that are
                  used to produce finished goods), work-in-progress (WIP), and
                  finished goods or those that are ready for sale. As noted
                  above, inventory is classified as a current asset on a
                  company's balance sheet, and it serves as a buffer between
                  manufacturing and order fulfillment. When an inventory item is
                  sold, its carrying cost transfers to the cost of goods sold
                  (COGS) category on the income statement. Inventory can be
                  valued in three ways. These methods are the: First-in,
                  first-out (FIFO) method, which says that the cost of goods
                  sold is based on the cost of the earliest purchased materials.
                  The carrying cost of remaining inventory, on the other hand,
                  is based on the cost of the latest purchased materials
                  Last-in, first-out (LIFO) method, which states that the cost
                  of goods sold is valued using the cost of the latest purchased
                  materials, while the value of the remaining inventory is based
                  on the earliest purchased materials. Weighted average method,
                  which requires valuing both inventory and the COGS based on
                  the average cost of all materials bought during the period.
                </p>
              </div>
            </div>
            {/* ++++ */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
