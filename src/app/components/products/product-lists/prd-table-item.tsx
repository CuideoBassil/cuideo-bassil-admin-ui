import { IProduct } from "@/types/product-type";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import EditDeleteBtn from "../../button/edit-delete-btn";
const ProductTableItem = ({ product }: { product: IProduct }) => {
  const {
    _id,
    img,
    title,
    sku,
    price,
    reviews,
    status,
    description,
    brand,
    category,
    quantity,
  } = product || {};
  const averageRating =
    reviews && reviews?.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9 gap-2">
      <td className="pr-8 py-5 whitespace-nowrap ">
        <div className="flex items-center flex-row gap-2 ">
          <Image
            className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
            src={product.img}
            width={60}
            height={60}
            alt="product img"
          />
          <div className="font-medium text-heading text-hover-primary transition ">
            {title}
          </div>
        </div>
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] ">{sku}</td>
      <td className="px-3 py-3 font-normal text-[#55585B]">${price}</td>
      {/* <td className="px-3 py-3 font-normal  text-[#55585B] ">
        {description.slice(0, 45)}
        {description.length > 45 && "..."}
      </td> */}
      <td className="px-3 py-3 font-normal text-heading ">
        <div className="flex justify-end items-center space-x-1 text-tiny">
          <span className="text-yellow flex items-center space-x-1">
            <Rating
              allowFraction
              size={18}
              initialValue={averageRating}
              readonly={true}
            />
          </span>
        </div>
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] ">{brand.name}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] ">{category.name}</td>
      <td className="px-3 py-3 ">
        <span
          className={`text-[10px] p-1 rounded-md   ${
            status === "in-stock"
              ? "text-success bg-success/10"
              : "text-danger bg-danger/10"
          }`}
        >
          {status === "in-stock" ? "In Stock" : "Out Of Stock"}
        </span>
      </td>
      {/* <td className="px-3 py-3 font-normal text-[#55585B] ">{quantity}</td> */}

      <td className="px-9 py-3 ">
        <div className="flex items-center justify-end space-x-2">
          <EditDeleteBtn id={_id} />
        </div>
      </td>
    </tr>
  );
};

export default ProductTableItem;
