import Image from "next/image";
// internal
import { IProduct } from "@/types/product-type";
import ProductGridAction from "./product-grid-action";

const ProductGridItem = ({ product }: { product: IProduct }) => {
  const { _id, image, title, sku, price, reviews, status, quantity } =
    product || {};
  // averageRating
  const averageRating =
    reviews && reviews?.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
  return (
    <div className="rounded-md bg-white border-gray6 border">
      <div className="relative">
        <div className="inline-block bg-[#F2F3F5]">
          <Image
            className="w-full"
            src={image}
            width={279}
            height={297}
            alt="product img"
          />
        </div>
        <div className="absolute top-5 right-5 z-10">
          <ProductGridAction id={_id} />
        </div>
      </div>
      <div className="px-5 py-5">
        <p className="text-lg font-normal text-heading text-hover-primary mb-2 inline-block leading-none">
          {title}
        </p>
        {/* <div className="flex items-center space-x-1 text-tiny mb-5">
          <span className="text-yellow flex items-center space-x-1">
            <Rating
              allowFraction
              size={18}
              initialValue={averageRating}
              readonly={true}
            />
          </span>
        </div> */}
        <div className="leading-none mb-2">
          <span className="text-base font-medium text-black">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductGridItem;
