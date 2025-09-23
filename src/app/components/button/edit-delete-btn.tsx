import {
  useDeleteProductMutation,
  useUpdateProductQuantityMutation,
} from "@/redux/product/productApi";
import { Delete, Edit } from "@/svg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import DeleteTooltip from "../tooltip/delete-tooltip";
import EditTooltip from "../tooltip/edit-tooltip";
import ReviewTooltip from "../tooltip/reviews-tooltip";

const EditDeleteBtn = ({ id }: { id: string }) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [deleteProduct, { data: delData }] = useDeleteProductMutation();
  const [updateProductQuantity, { data: deData }] =
    useUpdateProductQuantityMutation();

  const handleDelete = async (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this product ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(productId);
          if ("error" in res) {
            if ("data" in res.error) {
              const errorData = res.error.data as { message?: string };
              if (typeof errorData.message === "string") {
                return notifyError(errorData.message);
              }
            }
          } else {
            notifySuccess(`This product has been deleted.`);
          }
        } catch (error) {}
      }
    });
  };

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
  function generateRandomItems(count = 1) {
    const items: { sku: string; quantity: number }[] = [];

    for (let i = 1; i <= count; i++) {
      const sku = `SKU${i.toString().padStart(4, "0")}`; // SKU0001, SKU0002, ...
      const quantity = Math.floor(Math.random() * 5) + 1; // random 1-5
      items.push({ sku, quantity });
    }

    return items;
  }
  const handleUpdate = async () => {
    const data = [
      ...generateRandomItems(),
      { sku: "FFB8259SBS", quantity: 0 },
      { sku: "LED32HHL", quantity: 0 },
    ];
    updateProductQuantity({ data });
  };

  return (
    <>
      <div className="relative">
        <Link href={`/edit-product/${id}`}>
          <button
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
            className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
          >
            <Edit />
          </button>
        </Link>
        <EditTooltip showEdit={showEdit} />
      </div>
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
      {/* <div className="relative">
        <button
          onClick={() => handleUpdate()}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          Update
        </button>
      </div> */}
    </>
  );
};
export default EditDeleteBtn;
