import { useDeleteReviewsMutation } from "@/redux/review/reviewApi";
import { Delete } from "@/svg";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import DeleteTooltip from "../../tooltip/delete-tooltip";
import ReviewTooltip from "../../tooltip/reviews-tooltip";

const DeleteReviews = ({ id }: { id: string }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [deleteReviews, { data, isError, isLoading }] =
    useDeleteReviewsMutation();

  // handleDelete
  const handleDelete = (productId: string) => {
    if (productId) {
      Swal.fire({
        title: "Are you sure?",
        text: `All reviews deleted for the product?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await deleteReviews(id);
            if ("data" in res) {
              if ("message" in res.data) {
                Swal.fire("Deleted!", `${res.data.message}`, "success");
              }
            } else {
              Swal.fire("Deleted!", `Product reviews not found`, "error");
            }
          } catch (error) {
            // Handle error or show error message
          }
        }
      });
    }
  };
  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="relative">
        <button
          onClick={() => handleDelete(id)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          <Delete />
        </button>
        <DeleteTooltip showDelete={showDelete} />
      </div>
      <div className="relative">
        <Link href={`/edit-product/${id}/reviews`}>
          <button
            onMouseEnter={() => setShowReview(true)}
            onMouseLeave={() => setShowReview(false)}
            className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-blue-500 hover:border-blue-500 hover:text-white"
          >
            <EyeIcon width={15} />
          </button>
        </Link>
        <ReviewTooltip showReview={showReview} />
      </div>
    </div>
  );
};

export default DeleteReviews;
