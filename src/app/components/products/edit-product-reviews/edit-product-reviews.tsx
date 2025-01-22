"use client";
import usePagination from "@/hooks/use-pagination";
import useProductSubmit from "@/hooks/useProductSubmit";
import { useGetProductQuery } from "@/redux/product/productApi";
import { useState } from "react";
import ErrorMsg from "../../common/error-msg";
import Pagination from "../../ui/Pagination";
import ProductReviewTableHead from "../product-lists/prd-review-table-head";
import ProductReviewTableItem from "../product-lists/prd-review-table-item";

const EditProductReviews = ({ id }: { id: string }) => {
  const { data: product, isError, isLoading, refetch } = useGetProductQuery(id);
  const paginationData = usePagination(product?.reviews || [], 8);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <>
        <div className="relative overflow-x-auto w-full  mx-8 overflow-auto">
          <h3>{product.title}</h3>
          <h5>SKU: {product.sku}</h5>
          <table className="w-[100%] text-base text-left text-gray-500">
            {/* table head start */}
            <ProductReviewTableHead />
            {/* table head end */}
            <tbody>
              {product.reviews.map((review: any, i: number) => (
                <ProductReviewTableItem
                  key={i}
                  review={review}
                  refetch={refetch()}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* bottom  */}
        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing {currentItems.length} of {product?.reviews.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center mx-8 pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default EditProductReviews;
