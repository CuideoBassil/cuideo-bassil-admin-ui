import { Rating } from "react-simple-star-rating";
import DeleteReviewBtn from "../../button/delete-review-btn";
const ProductReviewTableItem = (review: any, refetch: any) => {
  const { _id, name, comment, email, phoneNumber, rating } =
    review.review || {};

  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
      <td className="pr-8 py-5 whitespace-nowrap">{name}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] ">{email}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] ">{phoneNumber}</td>
      <td className="px-3 py-3 font-normal  text-[#55585B] ">
        {comment?.slice(0, 45)}
        {comment?.length > 45 && "..."}
      </td>
      <td className="px-3 py-3 font-normal text-heading ">
        <div className="flex justify-end items-center space-x-1 text-tiny">
          <span className="text-yellow flex items-center space-x-1">
            <Rating
              allowFraction
              size={18}
              initialValue={rating}
              readonly={true}
            />
          </span>
        </div>
      </td>

      <td className="px-9 py-3 ">
        <div className="flex items-center justify-end space-x-2">
          <DeleteReviewBtn id={_id} refetch={refetch} />
        </div>
      </td>
    </tr>
  );
};

export default ProductReviewTableItem;
