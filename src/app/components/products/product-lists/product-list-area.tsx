"use client";
import usePagination from "@/hooks/use-pagination";
import { useGetAllProductsQuery } from "@/redux/product/productApi";
import { Search } from "@/svg";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ErrorMsg from "../../common/error-msg";
import Pagination from "../../ui/Pagination";
import ProductTableHead from "./prd-table-head";
import ProductTableItem from "./prd-table-item";

const ProductListArea = () => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  // This part replaces your current useState and adds persistence logic
  const [pageSize, setPageSize] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("productPageSize");
      return stored ? Number(stored) : 15;
    }
    return 15;
  });

  useEffect(() => {
    localStorage.setItem("productPageSize", String(pageSize));
  }, [pageSize]);

  let filteredProducts = products?.data ? [...products.data] : [];

  if (searchValue) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (selectValue) {
    filteredProducts = filteredProducts.filter((p) => p.status === selectValue);
  }

  // Pagination should always be initialized with dynamic page size
  const paginationData = usePagination(filteredProducts, pageSize);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // setPageIndex(1); // Reset to first page
    handlePageClick({ selected: 0 });
  };

  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    // setPageIndex(1); // Reset to first page
    handlePageClick({ selected: 0 });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value)); // Update page size
    // setPageIndex(1); // Reset to first page
    handlePageClick({ selected: 0 });
  };

  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (filteredProducts.length === 0) {
    content = <ErrorMsg msg="No Products Found" />;
  } else {
    content = (
      <>
        <div className="relative overflow-x-auto mx-8">
          <table className="w-full text-base text-left text-gray-500 overflow-auto">
            <ProductTableHead />
            <tbody>
              {currentItems.map((prd) => (
                <ProductTableItem key={prd._id} product={prd} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing {currentItems.length} of {filteredProducts.length}
          </p>
          <div className="flex items-center space-x-4">
            <div className="pagination py-3 flex justify-end items-center mx-8 pagination">
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </div>
            <div className="page-size-dropdown">
              <span className="mr-2">Page size:</span>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="border rounded-md px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      <div className="tp-search-box flex items-center justify-between px-8 py-8">
        <div className="search-input relative">
          <input
            onChange={handleSearchProduct}
            className="input h-[44px] w-full pl-14"
            type="text"
            placeholder="product name"
          />
          <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
            <Search />
          </button>
        </div>
        <div className="flex justify-end space-x-6">
          <div className="search-select mr-3 flex items-center space-x-3">
            <span className="text-tiny inline-block leading-none">
              Status :{" "}
            </span>
            <select onChange={handleSelectField}>
              <option value="">All</option>
              <option value="in-stock">In stock</option>
              <option value="out-of-stock">Out of stock</option>
            </select>
          </div>
          <div className="product-add-btn flex">
            <Link href="/add-product" className="tp-btn">
              Add Product
            </Link>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default ProductListArea;
