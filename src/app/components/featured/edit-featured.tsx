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
    setDescription,
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
      <div className="col-span-12 ">
        <form
          onSubmit={handleSubmit((data) => handleSubmitEditFeatured(data, id))}
        >
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                <GlobalImgUpload
                  isSubmitted={isImageSubmitted}
                  setImage={setItemImage}
                  image={featured.img ? featured.img : "image"}
                  default_img={featured.img}
                  setIsSubmitted={setIsImageSubmitted}
                />
              </div>

              <div className="flex flex-col mb-5 w-[50%]">
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
            </div>
            <div
              style={{
                display: "flex",
                gap: 5,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <FeaturedFormField
                  default_val={featured.title}
                  register={register}
                  errors={errors}
                  name="Title"
                  isReq={true}
                />
              </div>

              <div className="mb-6 w-[100%]">
                <p className="mb-0 text-base text-black">Section</p>
                <div className="category-add-select select-bordered">
                  <FeaturedSection
                    setSection={setSection}
                    control={control}
                    default_value={featured.section}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 5,
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
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
              <FeaturedFormField
                default_val={featured.productSku}
                register={register}
                errors={errors}
                name="Sku"
                isReq={false}
              />
            </div>

            <FeaturedDesc
              register={register}
              default_val={featured.description}
              setValue={setDescription}
            />
            <button className="tp-btn px-7 py-2">Edit Featured</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {content}
      <div className="col-span-12 ">
        {/* featured table start */}
        <FeaturedTables />
        {/* featured table end */}
      </div>
    </div>
  );
};

export default EditFeatured;
