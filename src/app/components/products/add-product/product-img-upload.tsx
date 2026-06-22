import useUploadImage from "@/hooks/useUploadImg";
import { notifyError } from "@/utils/toast";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../common/loading";
import DefaultUploadImg from "./default-upload-img";

type IPropType = {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: boolean;
  default_img?: string;
};

const isHttpUrl = (s?: string) => !!s && /^https?:\/\//.test(s);

const ProductImgUpload = ({
  imgUrl,
  setImgUrl,
  isSubmitted,
  default_img,
}: IPropType) => {
  const { handleImageUpload, uploadData, isError, isLoading } =
    useUploadImage();

  const isInitialized = useRef(false);
  const [urlInput, setUrlInput] = useState("");

  // Only treat a real http(s) URL as an existing image; markers like "NO_IMAGE"
  // (used for products imported without a picture) are treated as no image.
  const safeDefaultImg = isHttpUrl(default_img) ? default_img : undefined;

  // Set default image only once on mount
  useEffect(() => {
    if (safeDefaultImg && !isInitialized.current) {
      setImgUrl(safeDefaultImg);
      isInitialized.current = true;
    }
  }, [safeDefaultImg, setImgUrl]);

  // Update image when upload completes
  useEffect(() => {
    if (uploadData?.data?.url && !isError) {
      setImgUrl(uploadData.data.url);
    }
  }, [uploadData, isError, setImgUrl]);

  const handleAddUrl = () => {
    const url = urlInput.trim();
    if (!isHttpUrl(url)) {
      return notifyError("Enter a valid image URL (must start with http/https)");
    }
    setImgUrl(url);
    setUrlInput("");
  };

  const hasImage = isHttpUrl(imgUrl);

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
      <p className="text-base text-black mb-4">
        Main Image <span className="text-red">*</span>
      </p>

      <div className="flex items-center justify-center min-h-[110px]">
        {isLoading ? (
          <Loading loading={isLoading} spinner="fade" />
        ) : !isSubmitted && hasImage ? (
          <div className="relative">
            {/* plain img so any pasted URL renders without next/image host config */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="inline-flex border rounded-md border-gray6 w-24 h-24 p-2 object-cover"
              src={imgUrl}
              alt="product image"
            />
            <button
              type="button"
              onClick={() => setImgUrl("")}
              className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center border border-gray6"
              aria-label="Remove main image"
            >
              ×
            </button>
          </div>
        ) : (
          <DefaultUploadImg wh={100} />
        )}
      </div>

      {/* Option 1: upload a file */}
      <div className="mt-6">
        <input
          onChange={handleImageUpload}
          type="file"
          name="image"
          id="product_img"
          className="hidden"
          accept="image/*"
          aria-label="Upload product image"
        />
        <label
          htmlFor="product_img"
          className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
        >
          Upload Image
        </label>
      </div>

      {/* Option 2: paste an image URL */}
      <div className="mt-4">
        <p className="text-tiny text-gray-400 mb-2">or paste an image URL</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder="https://res.cloudinary.com/..."
            className="flex-1 text-tiny border border-gray6 rounded-md px-3 py-2 focus:outline-none focus:border-theme"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="tp-btn px-4 py-2 text-tiny whitespace-nowrap"
          >
            Use URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImgUpload;
