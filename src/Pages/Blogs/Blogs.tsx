const blogs = [
  {
    title: "What is an inventory?",
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW52ZW50b3J5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    excerpt:
      "The term inventory refers to the raw materials used in production as well as the goods produced that are available for sale.",
    content:
      "The term inventory refers to the raw materials used in production as well as the goods produced that are available for sale. A company's inventory represents one of the most important assets it has because the turnover of inventory represents one of the primary sources of revenue generation and subsequent earnings for the company's shareholders. There are three types of inventory, including raw materials, work-in-progress, and finished goods. It is categorized as a current asset on a company's balance sheet. KEY TAKEAWAYS Inventory is the raw materials used to produce goods as well as the goods that are available for sale. It is classified as a current asset on a company's balance sheet. The three types of inventory include raw materials, work-in-progress, and finished goods. Inventory is valued in one of three ways, including the first-in, first-out method; the last-in, first-out method; and the weighted average method. Inventory management allows businesses to minimize inventory costs as they create or receive goods on an as-needed basis. Understanding Inventory Inventory is a very important asset for any company. It is defined as the array of goods used in production or finished goods held by a company during its normal course of business. There are three general categories of inventory, including raw materials (any supplies that are used to produce finished goods), work-in-progress (WIP), and finished goods or those that are ready for sale. As noted above, inventory is classified as a current asset on a company's balance sheet, and it serves as a buffer between manufacturing and order fulfillment. When an inventory item is sold, its carrying cost transfers to the cost of goods sold (COGS) category on the income statement. Inventory can be valued in three ways. These methods are the: First-in, first-out (FIFO) method, which says that the cost of goods sold is based on the cost of the earliest purchased materials. The carrying cost of remaining inventory, on the other hand, is based on the cost of the latest purchased materials Last-in, first-out (LIFO) method, which states that the cost of goods sold is valued using the cost of the latest purchased materials, while the value of the remaining inventory is based on the earliest purchased materials. Weighted average method, which requires valuing both inventory and the COGS based on the average cost of all materials bought during the period.",
  },
];

const Blogs = () => {
  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Blogs</h1>
          <p className="opacity-70 mt-2">
            Insights and articles about inventory management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="card bg-base-100 shadow-lg">
              <figure>
                <img src={blog.image} alt={blog.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.excerpt}</p>
                <div className="card-actions justify-end">
                  <label
                    htmlFor={`modal-${index}`}
                    className="btn btn-primary"
                  >
                    Read More
                  </label>
                </div>
              </div>

              <input
                type="checkbox"
                id={`modal-${index}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor={`modal-${index}`}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p className="py-4">{blog.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;