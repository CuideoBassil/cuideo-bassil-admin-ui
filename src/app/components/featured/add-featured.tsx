"use client";
import useFeaturedSubmit from "@/hooks/useFeaturedSubmit";
import { Sketch } from "@uiw/react-color";
import GlobalImgUpload from "../category/global-img-upload";
import FeaturedDesc from "./featured-desc";
import FeaturedSection from "./featured-section";
import FeaturedTables from "./featured-table";
import FeaturedFormField from "./form-field-two";

const AddFeatured = () => {
  const {
    errors,
    handleSubmit,
    register,
    setItemImage,
    handleSubmitFeatured,
    isImageSubmitted,
    setIsImageSubmitted,
    setSection,
    section,
    setHex,
    hex,
    control,
  } = useFeaturedSubmit();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitFeatured)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* featured image upload */}
            <GlobalImgUpload
              isSubmitted={isImageSubmitted}
              setImage={setItemImage}
              image="image"
              setIsSubmitted={setIsImageSubmitted}
            />
            {/* featured image upload */}

            {/* Form Field */}
            {/* <FeaturedFormField
              register={register}
              errors={errors}
              name="Background"
              isReq={true}
            /> */}
            <div className="flex flex-col mb-5">
              <p className="mb-0 text-base text-black">Background Color</p>
              <Sketch
                style={{ width: "100%" }}
                color={hex}
                disableAlpha={true}
                onChange={(color) => {
                  setHex(color.hex);
                }}
              />
            </div>
            <FeaturedFormField
              register={register}
              errors={errors}
              name="Title"
              isReq={true}
            />

            <FeaturedFormField
              register={register}
              errors={errors}
              name="Price"
              isReq={false}
              type="number"
            />
            <FeaturedFormField
              register={register}
              errors={errors}
              name="Discounted"
              isReq={false}
              type="number"
            />

            {/* Form Field */}
            <div className="mb-6">
              <p className="mb-0 text-base text-black">Section</p>
              <div className="category-add-select select-bordered">
                <FeaturedSection
                  setSection={setSection}
                  control={control}
                  default_value={section}
                />
              </div>
            </div>

            {/* description start */}
            <FeaturedDesc register={register} />
            {/* description end */}

            <button className="tp-btn px-7 py-2">Add Featured Item</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        {/* featured table start */}
        <FeaturedTables />
        {/* <FeaturedTabless /> */}
        {/* featured table end */}
      </div>
    </div>
  );
};

export default AddFeatured;
