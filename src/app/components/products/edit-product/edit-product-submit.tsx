"use client";
import useProductSubmit from "@/hooks/useProductSubmit";
import { useGetProductQuery } from "@/redux/product/productApi";
import { IProduct } from "@/types/product-type";
import ErrorMsg from "../../common/error-msg";
import DescriptionTextarea from "../add-product/description-textarea";
import OfferDatePicker from "../add-product/offer-date-picker";
import ProductAdditionalImagesUpload from "../add-product/product-additional-images-upload";
import ProductColor from "../add-product/product-color";
import ProductImgUpload from "../add-product/product-img-upload";
import ProductTypeBrand from "../add-product/product-type-brand";
import Tags from "../add-product/tags";
import FormField from "../form-field";

const EditProductSubmit = ({ id }: { id: string }) => {
  const { data: product, isError, isLoading, refetch } = useGetProductQuery(id);
  const {
    handleSubmit,
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
    setColor,
    isSubmitted,
    handleEditProduct,
    setOfferDate,
    offerDate,
    setDescription,
  } = useProductSubmit();

  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    let productDetails: IProduct = product.data;

    content = (
      <form
        onSubmit={handleSubmit(async (data) => {
          await handleEditProduct(data, id);
          refetch();
        })}
      >
        <div className="flex flex-col">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <FormField
              title="title"
              isRequired
              placeHolder="Product Title"
              register={register}
              errors={errors}
              defaultValue={productDetails.title}
            />
            <DescriptionTextarea
              register={register}
              setValue={setDescription}
              errors={errors}
              defaultValue={productDetails.description}
            />
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
                defaultValue={productDetails.price}
              />
              <FormField
                title="SKU"
                isRequired
                placeHolder="SKU"
                bottomTitle="Enter the product SKU."
                register={register}
                errors={errors}
                defaultValue={productDetails.sku}
              />
              <FormField
                title="quantity"
                isRequired
                placeHolder="Quantity"
                bottomTitle="Enter the product quantity."
                type="number"
                register={register}
                errors={errors}
                defaultValue={productDetails.quantity}
              />
            </div>
          </div>
          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-6">
              <FormField
                title="discount_price"
                type="number"
                isRequired={false}
                placeHolder="Discounted  Price"
                bottomTitle="Set the product discounted price."
                register={register}
                errors={errors}
                defaultValue={productDetails.discount}
              />
              <div>
                <p className="mb-0 text-base text-black capitalize">
                  start and end date
                </p>
                <OfferDatePicker
                  defaultValue={productDetails.offerDate}
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
            setBrand={setBrand}
            setCategory={setCategory}
            setProductType={setProductType}
            brand={brand}
            category={category}
            productType={productType}
            default_value={{
              brand: productDetails.brand?.name,
              productType: productDetails.productType?.name,
              category: productDetails.category?.name,
            }}
          />
          <ProductColor
            defaul_value={productDetails.color}
            color={color}
            setColor={setColor}
          />
          <ProductImgUpload
            imgUrl={img}
            setImgUrl={setImg}
            isSubmitted={isSubmitted}
            default_img={productDetails.image}
          />
          <ProductAdditionalImagesUpload
            imgUrl={imageURLs}
            setImgUrl={setImageURLs}
            isSubmitted={isSubmitted}
            default_images={productDetails.additionalImages}
          />
          <Tags
            tags={tags}
            setTags={setTags}
            default_value={productDetails.tags}
          />
        </div>
        <button className="tp-btn px-5 py-2 mt-5" type="submit">
          Submit Product
        </button>
      </form>
    );
  }

  return <>{content}</>;
};

export default EditProductSubmit;
