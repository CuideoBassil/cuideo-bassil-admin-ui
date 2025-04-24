"use client";
import { useGetFilteredPaginatedProductsQuery } from "@/redux/product/productApi";
import { Search } from "@/svg";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ErrorMsg from "../../common/error-msg";
import ServerPagination from "../../ui/ServerPagination";
import ProductTableHead from "./prd-table-head";
import ProductTableItem from "./prd-table-item";

const ProductListArea = () => {
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("productPageSize");
      return stored ? Number(stored) : 15;
    }
    return 15;
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setCurrPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Save page size to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("productPageSize", String(pageSize));
  }, [pageSize]);

  // Build API query parameters with stable reference for caching
  const queryParams = React.useMemo(() => {
    console.log("debouncedSearch", debouncedSearch);
    return {
      skip: (currPage - 1) * pageSize,
      take: pageSize,
      search: debouncedSearch || undefined,
      status: selectValue || undefined,
    };
  }, [currPage, pageSize, debouncedSearch, selectValue]);

  const {
    data: productsData,
    isError,
    isLoading,
    isFetching,
  } = useGetFilteredPaginatedProductsQuery(queryParams, {
    // Cache behavior configuration
    refetchOnMountOrArgChange: false, // Don't refetch when args are the same
    refetchOnFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on reconnect
  });

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    setCurrPage(1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrPage(1);
  };

  let content = null;

  if (isLoading || isFetching) {
    content = (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading products...</span>
      </div>
    );
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!productsData?.products?.length) {
    content = <ErrorMsg msg="No Products Found" />;
  } else {
    content = (
      <>
        <div className="relative overflow-x-auto mx-8">
          <table className="w-full text-base text-left text-gray-500 overflow-auto">
            <ProductTableHead />
            <tbody>
              {productsData.products.map((prd: any) => (
                <ProductTableItem key={prd._id} product={prd} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing {productsData.products.length} of {productsData.totalCount}
          </p>
          <div className="flex items-center space-x-4">
            <div className="pagination py-3 flex justify-end items-center mx-8">
              <ServerPagination
                items={Array(productsData.totalCount).fill(0)}
                countOfPage={pageSize}
                currPage={currPage}
                setCurrPage={setCurrPage}
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
            value={searchValue}
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
            <select onChange={handleSelectField} value={selectValue}>
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
