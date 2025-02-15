import { useGetAllBrandsQuery } from "@/redux/brand/brandApi";
import { useGetCategoriesByProductTypeQuery } from "@/redux/category/categoryApi";
import { useGetAllProductTypesQuery } from "@/redux/product-type/productTypeApi";
import { ICategoryItem } from "@/types/category-type";
import { useEffect } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMsg from "../../common/error-msg";
import Loading from "../../common/loading";

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
      <p className="text-base text-black">
        {label} <span className="text-red">*</span>
      </p>
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
      // Check if the selected product type needs to be updated
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

      // Check if the selected brand needs to be updated
      if (brandsData?.result) {
        const defaultBrand = brandsData.result.find(
          (b) => b.name === default_value.brand
        );
        if (defaultBrand && defaultBrand._id !== selectBrand.id) {
          setSelectBrand({ id: defaultBrand._id, name: defaultBrand.name });
        }
      }

      // Check if the selected category needs to be updated
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

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6">
        {/* Product Type Selection */}
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
        />

        {/* Category Selection */}
        {categoryData?.data && (
          <SelectInput
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

        {/* Brand Selection */}
        <SelectInput
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
    </div>
  );
};

export default ProductTypeBrand;
