import useUploadImage from "@/hooks/useUploadImg";
import React, { useEffect, useState } from "react";
import Loading from "../../common/loading";
import DefaultUploadImg from "./default-upload-img";
import UploadImage from "./upload-image";

type IPropType = {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: boolean;
  default_img?: string;
};

const ProductImgUpload = ({
  imgUrl,
  setImgUrl,
  isSubmitted,
  default_img,
}: IPropType) => {
  const { handleImageUpload, uploadData, isError, isLoading } =
    useUploadImage();

  useEffect(() => {
    if (uploadData?.data?.url && !isError) {
      setImgUrl(uploadData.data.url);
    }
  }, [uploadData, isError, setImgUrl]);

  useEffect(() => {
    if (default_img) {
      setImgUrl(default_img);
    }
  }, [default_img, setImgUrl]);

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
      <p className="text-base text-black mb-4">
        Upload Main Image <span className="text-red">*</span>
      </p>
      <div className="flex items-center justify-center">
        {isSubmitted ? (
          <DefaultUploadImg wh={100} />
        ) : isLoading ? (
          <Loading loading={isLoading} spinner="fade" />
        ) : uploadData?.data?.url && !isError ? (
          <UploadImage
            file={{ url: uploadData.data.url, id: uploadData.data.id }}
            setImgUrl={setImgUrl}
          />
        ) : (
          <DefaultUploadImg img={default_img} isLoading={isLoading} wh={100} />
        )}
      </div>

      <div className="mt-8">
        <input
          onChange={handleImageUpload}
          type="file"
          name="image"
          id="product_img"
          className="hidden"
          aria-label="Upload product image"
        />
        <label
          htmlFor="product_img"
          className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
        >
          Upload Image
        </label>
      </div>
    </div>
  );
};

export default ProductImgUpload;
