"use client";
import useUploadImage from "@/hooks/useUploadImg";
import React, { useEffect, useState } from "react";
import Loading from "../../common/loading";

type IPropType = {
  imgUrl: string[]; // Ensure this is an array
  setImgUrl: React.Dispatch<React.SetStateAction<string[]>>;
  isSubmitted: boolean;
  default_images?: any[]; // Default images prop should be an array of strings
};

const ProductAdditionalImagesUpload = ({
  imgUrl,
  setImgUrl,
  isSubmitted,
  default_images = [],
}: IPropType) => {
  const [imgUrls, setImgUrls] = useState<string[]>(imgUrl || []); // Initialize with imgUrl or empty array
  const { handleImageUpload, uploadData, isError, isLoading } =
    useUploadImage();

  // Sync parent state with component state
  useEffect(() => {
    setImgUrls(imgUrl);
  }, [imgUrl]);

  // Sync default images into the component state if available
  useEffect(() => {
    if (default_images?.length > 0) {
      setImgUrls((prev) => [...default_images, ...prev]); // Add default images to the front or back
    }
  }, [default_images]);

  // Update uploaded images
  useEffect(() => {
    if (uploadData?.data?.url && !isError) {
      setImgUrls((prev) => {
        const updatedUrls = [...prev, uploadData.data.url];
        setImgUrl(updatedUrls); // Update parent state
        return updatedUrls;
      });
    }
  }, [uploadData, isError, setImgUrl]);

  // Handle file upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await handleImageUpload(event);
  };

  // Remove image by index
  const removeImage = (index: number) => {
    setImgUrls((prev) => {
      const updatedUrls = prev.filter((_, i) => i !== index);
      setImgUrl(updatedUrls); // Sync with parent
      return updatedUrls;
    });
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
      <p className="text-base text-black mb-4">Upload Additional Images</p>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {imgUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`uploaded-img-${index}`}
              className="w-20 h-20 object-cover rounded-md"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}

        {/* Show upload box only if less than 10 images */}
        {imgUrls.length < 10 && (
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
