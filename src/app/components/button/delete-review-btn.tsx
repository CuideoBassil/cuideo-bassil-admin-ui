import { useDeleteSingleReviewMutation } from "@/redux/review/reviewApi";
import { Delete } from "@/svg";
import { notifyError } from "@/utils/toast";
import { useState } from "react";
import Swal from "sweetalert2";
import DeleteTooltip from "../tooltip/delete-tooltip";

const DeleteReviewBtn = ({ id, refetch }: { id: string; refetch: any }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deleteSingleReview, { data: delData }] =
    useDeleteSingleReviewMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this review ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteSingleReview(id);
          if ("error" in res) {
            if ("data" in res.error) {
              const errorData = res.error.data as { message?: string };
              if (typeof errorData.message === "string") {
                return notifyError(errorData.message);
              }
            }
          } else {
            Swal.fire("Deleted!", `The review has been deleted.`, "success");
            refetch();
          }
        } catch (error) {}
      }
    });
  };

  return (
    <>
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
    </>
  );
};
export default DeleteReviewBtn;
