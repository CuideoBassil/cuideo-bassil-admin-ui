"use client";
import useFeaturedSubmit from "@/hooks/useFeaturedSubmit";
import { useGetFeaturedQuery } from "@/redux/featured/featuredApi";
import { Sketch } from "@uiw/react-color";
import { useEffect } from "react";
import { default as GlobalImgUpload } from "../category/global-img-upload";
import ErrorMsg from "../common/error-msg";
import Loading from "../common/loading";
import FeaturedDesc from "./featured-desc";
import FeaturedSection from "./featured-section";
import FeaturedTables from "./featured-table";
import FeaturedFormField from "./form-field-two";

const EditFeatured = ({ id }: { id: string }) => {
  const {
    errors,
    handleSubmit,
    register,
    setItemImage,
    handleSubmitEditFeatured,
    isImageSubmitted,
    setIsImageSubmitted,
    setSection,
    setHex,
    hex,
    section,
    control,
  } = useFeaturedSubmit();
  // get featured
  const { data: featured, isLoading, isError, error } = useGetFeaturedQuery(id);
  useEffect(() => {
    if (featured && !isError) {
      setHex(featured.background);
      setSection(featured.section);
    }
  }, [featured, isError, setHex, setSection]);
  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (!featured && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (featured && !isError) {
    content = (
      <div className="col-span-12 lg:col-span-4">
        <form
          onSubmit={handleSubmit((data) => handleSubmitEditFeatured(data, id))}
        >
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* featured image upload */}
            <GlobalImgUpload
              isSubmitted={isImageSubmitted}
              setImage={setItemImage}
              image={featured.img ? featured.img : "image"}
              default_img={featured.img}
              setIsSubmitted={setIsImageSubmitted}
            />
            {/* featured image upload */}

            {/* Form Field */}
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
              default_val={featured.title}
              register={register}
              errors={errors}
              name="Title"
              isReq={true}
            />

            <FeaturedFormField
              default_val={featured.price}
              register={register}
              errors={errors}
              name="Price"
              isReq={false}
              type="number"
            />
            <FeaturedFormField
              default_val={featured.discounted}
              register={register}
              errors={errors}
              name="Discounted"
              isReq={false}
              type="number"
            />
            <div className="mb-6">
              <p className="mb-0 text-base text-black">Section</p>
              <div className="category-add-select select-bordered">
                <FeaturedSection
                  setSection={setSection}
                  control={control}
                  default_value={featured.section}
                />
              </div>
            </div>

            {/* Form Field */}

            {/* description start */}
            <FeaturedDesc
              register={register}
              default_val={featured.description}
            />
            {/* description end */}

            <button className="tp-btn px-7 py-2">Edit Featured</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {content}
      <div className="col-span-12 lg:col-span-8">
        {/* featured table start */}
        <FeaturedTables />
        {/* featured table end */}
      </div>
    </div>
  );
};

export default EditFeatured;
