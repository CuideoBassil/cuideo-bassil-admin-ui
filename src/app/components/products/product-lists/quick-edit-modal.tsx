"use client";
import { useEditProductMutation } from "@/redux/product/productApi";
import { IProduct } from "@/types/product-type";
import { notifyError, notifySuccess } from "@/utils/toast";
import React, { useEffect, useState } from "react";

type IQuickEditModalProps = {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

const QuickEditModal = ({
  product,
  isOpen,
  onClose,
  refetch,
}: IQuickEditModalProps) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount || 0);
  const [editProduct, { isLoading }] = useEditProductMutation();

  // Update local state when product changes
  useEffect(() => {
    setTitle(product.title);
    setPrice(product.price);
    setDiscount(product.discount || 0);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      notifyError("Product title is required");
      return;
    }

    if (price <= 0) {
      notifyError("Price must be greater than 0");
      return;
    }

    if (discount > price) {
      notifyError("Discount price cannot be greater than regular price");
      return;
    }

    try {
      // Only update the fields we're editing, keep everything else the same
      const updateData = {
        ...product,
        title,
        price: +price,
        discount: +discount,
      };

      await editProduct({ id: product._id, data: updateData }).unwrap();
      notifySuccess("Product updated successfully");
      refetch(); // Refetch the product list
      onClose();
    } catch (error: any) {
      notifyError(error?.data?.message || "Failed to update product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Quick Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            disabled={isLoading}
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label
                htmlFor="quick-edit-title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="quick-edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                disabled={isLoading}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="quick-edit-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <input
                id="quick-edit-price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                disabled={isLoading}
                required
              />
            </div>

            {/* Discount Price */}
            <div>
              <label
                htmlFor="quick-edit-discount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discount Price
              </label>
              <input
                id="quick-edit-discount"
                type="number"
                step="0.01"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount price"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave as 0 if no discount
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickEditModal;
