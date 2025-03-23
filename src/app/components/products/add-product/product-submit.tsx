import useProductSubmit from "@/hooks/useProductSubmit";
import FormField from "../form-field";
import DescriptionTextarea from "./description-textarea";
import OfferDatePicker from "./offer-date-picker";
import ProductAdditionalImagesUpload from "./product-additional-images-upload";
import ProductColor from "./product-color";
import ProductImgUpload from "./product-img-upload";
import ProductTypeBrand from "./product-type-brand";
import Tags from "./tags";

const ProductSubmit = () => {
  const {
    handleSubmit,
    handleSubmitProduct,
    register,
    errors,
    tags,
    setTags,
    control,
    setImg,
    img,
    setCategory,
    setBrand,
    setProductType,
    category,
    brand,
    productType,
    setImageURLs,
    imageURLs,
    color,
    offerDate,
    setOfferDate,
    setColor,
    isSubmitted,
  } = useProductSubmit();

  return (
    <form onSubmit={handleSubmit(handleSubmitProduct)}>
      <div className="flex flex-col">
        <div className="mb-6 bg-white px-8 py-8 rounded-md">
          <FormField
            title="title"
            isRequired
            placeHolder="Product Title"
            register={register}
            errors={errors}
          />
          <DescriptionTextarea register={register} errors={errors} />
        </div>

        <div className="bg-white px-8 py-8 rounded-md mb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
            <FormField
              title="price"
              isRequired
              placeHolder="Price"
              bottomTitle="Set the base price of product."
              type="number"
              register={register}
              errors={errors}
            />
            <FormField
              title="SKU"
              isRequired
              placeHolder="SKU"
              bottomTitle="Enter the product SKU."
              register={register}
              errors={errors}
            />
            <FormField
              title="quantity"
              isRequired
              placeHolder="Quantity"
              bottomTitle="Enter the product quantity."
              type="number"
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div className="bg-white px-8 py-8 rounded-md mb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-6">
            <FormField
              title="discount percentage"
              type="number"
              isRequired={false}
              placeHolder="Discount"
              bottomTitle="Set the product Discount."
              register={register}
              errors={errors}
            />
            <div>
              <p className="mb-0 text-base text-black capitalize">
                start and end date
              </p>
              <OfferDatePicker
                offerDate={offerDate}
                setOfferDate={setOfferDate}
              />
              <span className="text-tiny leading-4">
                set the product offer and end date
              </span>
            </div>
            {/* date picker start */}
          </div>
        </div>
        <ProductTypeBrand
          register={register}
          errors={errors}
          control={control}
          setSelectBrand={setBrand}
          setSelectCategory={setCategory}
          setSelectProductType={setProductType}
          selectBrand={brand}
          selectCategory={category}
          selectProductType={productType}
        />
        <ProductColor color={color} setColor={setColor} />
        <ProductImgUpload
          imgUrl={img}
          setImgUrl={setImg}
          isSubmitted={isSubmitted}
        />
        <ProductAdditionalImagesUpload
          imgUrl={imageURLs}
          setImgUrl={setImageURLs}
          isSubmitted={isSubmitted}
        />
        <Tags tags={tags} setTags={setTags} />
      </div>
      <button className="tp-btn px-5 py-2 mt-5" type="submit">
        Submit Product
      </button>
    </form>
  );
};

export default ProductSubmit;
