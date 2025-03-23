import useBrandSubmit from "@/hooks/useBrandSubmit";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import useProductTypeSubmit from "@/hooks/useProductTypeSubmit";
import { useGetAllBrandsQuery } from "@/redux/brand/brandApi";
import { useGetCategoriesByProductTypeQuery } from "@/redux/category/categoryApi";
import { useGetAllProductTypesQuery } from "@/redux/product-type/productTypeApi";
import { ICategoryItem } from "@/types/category-type";
import { useEffect, useState } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import CategoryParent from "../../category/category-parent";
import GlobalImgUpload from "../../category/global-img-upload";
import ErrorMsg from "../../common/error-msg";
import Loading from "../../common/loading";
import FormField from "../form-field";
import ProductType from "./product-type";

// Prop Type
type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  setSelectBrand: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  setSelectCategory: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  selectProductType: { name: string; id: string };
  selectBrand: { name: string; id: string };
  selectCategory: { name: string; id: string };
  default_value?: { brand: string; productType: string; category: string };
};

// Select Component
const SelectInput = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  defaultValue,
  isLoading,
  isError,
  errorMessage,
  handleOnClick,
}: {
  label: string;
  name: string;
  options: { id: string; name: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  defaultValue?: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  handleOnClick?: () => void;
}) => {
  if (isLoading) {
    return (
      <div className="mb-5">
        <p className="text-base text-black">Loading...</p>
        <Loading loading={isLoading} spinner="scale" />
      </div>
    );
  }

  if (isError || options.length === 0) {
    return <ErrorMsg msg={isError ? errorMessage : `No ${label} Found`} />;
  }

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-base text-black mb-0">
          {label} <span className="text-red">*</span>
        </p>
        {handleOnClick && (
          <button
            onClick={handleOnClick}
            className="text-black   border border-black-500  hover:bg-blue-600  rounded-full px-2 "
          >
            Add
          </button>
        )}
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-blue-100 rounded-md p-3 text-gray-700 focus:outline-none focus:border-blue-500"
      >
        {!defaultValue && (
          <option value="">Select {label.toLowerCase()}</option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <ErrorMsg msg={error || ""} />
    </div>
  );
};

const ProductTypeBrand = ({
  errors,
  selectBrand,
  setSelectBrand,
  setSelectCategory,
  selectCategory,
  setSelectProductType,
  selectProductType,
  default_value,
}: IPropType) => {
  const [productTypeModal, setProductTypeModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const {
    data: productTypes,
    isError: productTypeError,
    isLoading: productTypeLoading,
  } = useGetAllProductTypesQuery();

  const {
    data: brandsData,
    isError: brandsError,
    isLoading: brandsLoading,
  } = useGetAllBrandsQuery();

  const {
    data: categoryData,
    isError: categoryError,
    isLoading: categoryLoading,
  } = useGetCategoriesByProductTypeQuery(
    default_value ? default_value.productType : selectProductType.name,
    {
      skip: !!!default_value && !selectProductType.name,
    }
  );

  useEffect(() => {
    if (default_value) {
      if (productTypes?.result) {
        const defaultProductType = productTypes.result.find(
          (pt) => pt.name === default_value.productType
        );
        if (
          defaultProductType &&
          defaultProductType._id !== selectProductType.id
        ) {
          setSelectProductType({
            id: defaultProductType._id,
            name: defaultProductType.name,
          });
        }
      }

      if (brandsData?.result) {
        const defaultBrand = brandsData.result.find(
          (b) => b.name === default_value.brand
        );
        if (defaultBrand && defaultBrand._id !== selectBrand.id) {
          setSelectBrand({ id: defaultBrand._id, name: defaultBrand.name });
        }
      }

      if (categoryData?.data) {
        const defaultCategory = categoryData.data.find(
          (cat) => cat.parent === default_value.category
        );
        if (defaultCategory && defaultCategory._id !== selectCategory.id) {
          setSelectCategory({
            id: defaultCategory._id,
            name: defaultCategory.parent,
          });
        }
      }
    }
  }, [
    default_value,
    productTypes,
    brandsData,
    categoryData,
    selectProductType.id,
    selectBrand.id,
    selectCategory.id,
    setSelectProductType,
    setSelectBrand,
    setSelectCategory,
  ]);
  const {
    handleSubmit: handleSubmitPT,
    register: registerPT,
    handleSubmitProductType,
    setLogo: setLogoPT,
    isSubmitted: isSubmittedPT,
    setIsSubmitted: setIsSubmittedPT,
  } = useProductTypeSubmit();

  const {
    handleSubmit: handleSubmitBR,
    register: registerBR,
    setLogo,
    handleSubmitBrand,
    isSubmitted: isSubmittedBR,
    setIsSubmitted,
  } = useBrandSubmit();

  const {
    selectProductType: selectProductTypeCT,
    setSelectProductType: setSelectProductTypeCT,
    control,
    register: registerCT,
    handleSubmit: handleSubmitCT,
    handleSubmitCategory,
  } = useCategorySubmit();

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6">
        <SelectInput
          label="Product Type"
          name="productType"
          options={
            productTypes?.result?.map((pt) => ({
              id: pt._id,
              name: pt.name,
            })) || []
          }
          value={selectProductType.name}
          onChange={(e) => {
            const selected = productTypes?.result?.find(
              (pt) => pt.name === e.target.value
            );
            setSelectProductType({
              id: selected?._id || "",
              name: e.target.value,
            });
          }}
          error={errors?.productType?.message as string}
          defaultValue={default_value?.productType}
          isLoading={productTypeLoading}
          isError={productTypeError}
          errorMessage="There was an error"
          // handleOnClick={() => setProductTypeModal(true)}
        />
        {categoryData?.data && (
          <SelectInput
            handleOnClick={() => setCategoryModal(true)}
            label="Category"
            name="category"
            options={
              categoryData?.data?.map((cat: ICategoryItem) => ({
                id: cat._id,
                name: cat.parent,
              })) || []
            }
            value={selectCategory.name}
            onChange={(e) => {
              const selected = categoryData?.data?.find(
                (cat: ICategoryItem) => cat.parent === e.target.value
              );
              setSelectCategory({
                id: selected?._id || "",
                name: e.target.value,
              });
            }}
            error={errors?.category?.message as string}
            defaultValue={default_value?.category}
            isLoading={categoryLoading}
            isError={categoryError}
            errorMessage="There was an error"
          />
        )}

        <SelectInput
          handleOnClick={() => setBrandModal(true)}
          label="Brand"
          name="brand"
          options={
            brandsData?.result?.map((b) => ({ id: b._id, name: b.name })) || []
          }
          value={selectBrand.name}
          onChange={(e) => {
            const selected = brandsData?.result?.find(
              (b) => b.name === e.target.value
            );
            setSelectBrand({ id: selected?._id || "", name: e.target.value });
          }}
          error={errors?.brand?.message as string}
          defaultValue={default_value?.brand}
          isLoading={brandsLoading}
          isError={brandsError}
          errorMessage="There was an error"
        />
      </div>
      {/* {productTypeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3 relative">
            <button
              onClick={() => setProductTypeModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              &times;
            </button>

            <h2 className="text-lg font-bold mb-3">Add New Product Type</h2>
            <div className="gap-6">
             
              <div className="mb-6 bg-white px-8 py-8 rounded-md">
                <GlobalImgUpload
                  isSubmitted={isSubmittedPT}
                  setImage={setLogoPT}
                  image=""
                  setIsSubmitted={setIsSubmittedPT}
                />
                <FormField
                  register={registerPT}
                  errors={errors}
                  title="name"
                  isRequired={true}
                  placeHolder={""}
                />
                <button
                  className="tp-btn px-7 py-2"
                  onClick={handleSubmitPT((data, e) => {
                    e?.preventDefault();
                    handleSubmitProductType(data);
                  })}
                >
                  Add Product Type
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {categoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-[9999]">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3 relative">
            <button
              onClick={() => setCategoryModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              &times;
            </button>

            <h2 className="text-lg font-bold mb-3">Add New Category</h2>
            <div className="gap-6">
              {/* <form onSubmit={handleSubmitCT(handleSubmitCategory)}> */}
              <div className="mb-6 bg-white px-8 py-8 rounded-md">
                <CategoryParent register={registerCT} errors={errors} />

                <div className="mb-6">
                  <p className="mb-0 text-base text-black">Product Type</p>
                  <div className="category-add-select select-bordered">
                    <ProductType
                      selectProductType={selectProductTypeCT}
                      setSelectProductType={setSelectProductTypeCT}
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>

                <button
                  className="tp-btn px-7 py-2"
                  onClick={handleSubmitCT((data, e) => {
                    e?.preventDefault();
                    handleSubmitCategory(data);
                  })}
                >
                  Add Category
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      )}
      {brandModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-[9999]">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3 relative">
            <button
              onClick={() => setBrandModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              &times;
            </button>

            <h2 className="text-lg font-bold mb-3">Add New Brand</h2>

            {/* <form
              onSubmit={handleSubmitBR(handleSubmitBrand)}
              className="gap-6"
            > */}
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <GlobalImgUpload
                isSubmitted={isSubmittedBR}
                setImage={setLogo}
                image=""
                setIsSubmitted={setIsSubmitted}
              />

              <FormField
                register={registerBR}
                errors={errors}
                title="name"
                isRequired={true}
                placeHolder=""
              />

              <button
                className="tp-btn px-7 py-2"
                onClick={handleSubmitBR((data, e) => {
                  e?.preventDefault();
                  handleSubmitBrand(data);
                })}
              >
                Add Brand
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTypeBrand;
