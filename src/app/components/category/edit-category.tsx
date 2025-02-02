"use client";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import { useGetCategoryQuery } from "@/redux/category/categoryApi";
import ProductType from "../products/add-product/product-type";
import CategoryParent from "./category-parent";
import CategoryTables from "./category-tables";

const EditCategory = ({ id }: { id: string }) => {
  const { data: categoryData, isError, isLoading } = useGetCategoryQuery(id);
  const {
    // selectProductType,
    setSelectProductType,
    errors,
    control,
    // categoryChildren,
    // setCategoryChildren,
    register,
    handleSubmit,
    setCategoryImg,
    categoryImg,
    error,
    isSubmitted,
    handleSubmitEditCategory,
  } = useCategorySubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        {categoryData && (
          <form
            onSubmit={handleSubmit((data) =>
              handleSubmitEditCategory(data, id)
            )}
          >
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              {/* category image upload */}
              {/* <CategoryImgUpload
                isSubmitted={isSubmitted}
                setImage={setCategoryImg}
                default_img={categoryData.img}
                image={categoryImg}
              /> */}
              {/* category image upload */}

              {/* category parent */}
              <CategoryParent
                register={register}
                errors={errors}
                default_value={categoryData.parent}
              />
              {/* category parent */}

              {/* <CategoryChildren
                categoryChildren={categoryChildren}
                setCategoryChildren={setCategoryChildren}
                error={error}
                default_value={categoryData.children}
              /> */}

              {/* Product Type */}
              <div className="mb-6">
                <p className="mb-0 text-base text-black">Product Type</p>
                <div className="category-add-select select-bordered">
                  <ProductType
                    setSelectProductType={setSelectProductType}
                    control={control}
                    errors={errors}
                    default_value={categoryData.productType}
                  />
                </div>
              </div>
              {/* Product Type */}

              {/* Category Description */}
              {/* <CategoryDescription
                register={register}
                default_value={categoryData.description}
              /> */}
              {/* Category Description */}

              <button className="tp-btn px-7 py-2">Edit Category</button>
            </div>
          </form>
        )}
      </div>
      <div className="col-span-12 lg:col-span-8">
        <CategoryTables />
      </div>
    </div>
  );
};

export default EditCategory;
