"use client";
import useUploadImage from "@/hooks/useUploadImg";
import Image from "next/image";
import React, { useEffect } from "react";
import Loading from "../../common/loading";

type IPropType = {
  imgUrl: string[];
  setImgUrl: React.Dispatch<React.SetStateAction<string[]>>;
  isSubmitted: boolean;
  default_images?: string[]; // ensure it's string[]
};

const ProductAdditionalImagesUpload = ({
  imgUrl,
  setImgUrl,
  isSubmitted,
  default_images = [],
}: IPropType) => {
  const { handleImageUpload, uploadData, isError, isLoading } =
    useUploadImage();

  // Merge default images on mount only once
  useEffect(() => {
    if (default_images.length > 0) {
      const merged = [...default_images, ...imgUrl].filter(
        (v, i, arr) => arr.indexOf(v) === i // remove duplicates
      );
      setImgUrl(merged);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // Update uploaded image
  useEffect(() => {
    if (uploadData?.data?.url && !isError) {
      const updatedUrls = [...imgUrl, uploadData.data.url];
      setImgUrl(updatedUrls);
    }
  }, [uploadData, isError, imgUrl, setImgUrl]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await handleImageUpload(event);
  };

  const removeImage = (index: number) => {
    const updatedUrls = imgUrl.filter((_, i) => i !== index);
    setImgUrl(updatedUrls);
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
      <p className="text-base text-black mb-4">Upload Additional Images</p>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {imgUrl.map((url, index) => (
          <div key={index} className="relative">
            <Image
              src={url}
              alt={`uploaded-img-${index}`}
              width={80}
              height={80}
              className="object-cover rounded-md"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}

        {imgUrl.length < 10 && (
          <label
            htmlFor="product_imgs"
            className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
          >
            <span className="text-2xl text-gray-400">+</span>
            <input
              onChange={handleUpload}
              type="file"
              id="product_imgs"
              className="hidden"
              accept="image/*"
            />
          </label>
        )}
      </div>

      {isLoading && (
        <div className="mt-4 flex justify-center">
          <Loading loading={isLoading} spinner="fade" />
        </div>
      )}
    </div>
  );
};

export default ProductAdditionalImagesUpload;
