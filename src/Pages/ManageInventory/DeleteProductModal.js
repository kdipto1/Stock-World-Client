import React from "react";

const DeleteProductModal = () => {
  return (
    <div>
      <label htmlFor="delete-product-modal" className="btn btn-xs btn-warning">
        Delete
      </label>
      <input
        type="checkbox"
        id="delete-product-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete?
          </h3>
          <div className="modal-action">
            <label
              // onClick={() => deleteItem(product?._id)}
              htmlFor="delete-product-modal"
              className="btn btn-warning"
            >
              Yes
            </label>
            <label htmlFor="delete-product-modal" className="btn btn-primary">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
