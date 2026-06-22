"use client";
import useUploadImage from "@/hooks/useUploadImg";
import { notifyError } from "@/utils/toast";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../common/loading";

const isHttpUrl = (s: string) => /^https?:\/\//.test(s);

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

  // Keep track of processed uploads to prevent duplicates
  const processedUploads = useRef(new Set<string>());
  const [urlInput, setUrlInput] = useState("");

  const handleAddUrl = () => {
    const url = urlInput.trim();
    if (!isHttpUrl(url)) {
      return notifyError("Enter a valid image URL (must start with http/https)");
    }
    if (imgUrl.includes(url)) {
      setUrlInput("");
      return;
    }
    setImgUrl((prev) => [...prev, url]);
    setUrlInput("");
  };

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

  // Update uploaded image - removed imgUrl from dependencies to prevent loop
  useEffect(() => {
    if (uploadData?.data?.url && !isError) {
      const newUrl = uploadData.data.url;

      // Check if we've already processed this upload
      if (!processedUploads.current.has(newUrl)) {
        processedUploads.current.add(newUrl);
        setImgUrl((prev) => [...prev, newUrl]);
      }
    }
  }, [uploadData, isError, setImgUrl]); // Removed imgUrl from dependencies

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await handleImageUpload(event);
  };

  const removeImage = (index: number) => {
    const removedUrl = imgUrl[index];
    // Remove from processed uploads when image is deleted
    processedUploads.current.delete(removedUrl);

    const updatedUrls = imgUrl.filter((_, i) => i !== index);
    setImgUrl(updatedUrls);
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
      <p className="text-base text-black mb-4">Upload Additional Images</p>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {imgUrl.map((url, index) => (
          <div key={index} className="relative">
            {/* plain img so any pasted URL renders without next/image host config */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`uploaded-img-${index}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-md border border-gray6"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer border border-gray6"
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

      {/* Add by URL */}
      {imgUrl.length < 10 && (
        <div className="mt-5">
          <p className="text-tiny text-gray-400 mb-2 text-left">
            or paste an image URL
          </p>
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
              Add URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdditionalImagesUpload;
