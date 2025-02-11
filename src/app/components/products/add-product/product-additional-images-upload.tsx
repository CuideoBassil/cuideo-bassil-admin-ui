import useUploadImage from "@/hooks/useUploadImg";
import React, { useEffect, useState } from "react";
import Loading from "../../common/loading";
import DefaultUploadImg from "./default-upload-img";

type IPropType = {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string[]>>;
  isSubmitted: boolean;
  default_img?: string;
};

const ProductAdditionalImagesUpload = ({
  imgUrl,
  setImgUrl,
  isSubmitted,
  default_img,
}: IPropType) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const { handleImageUpload, uploadData, isError, isLoading } =
    useUploadImage();

  useEffect(() => {
    if (uploadData && !isError) {
      setImgUrls((prev) => {
        console.log("New uploaded URL:", uploadData.data.url); // Debugging the upload data
        return [...prev, uploadData.data.url];
      });
    }
  }, [uploadData, isError]);

  useEffect(() => {
    if (default_img && initialLoad) {
      setImgUrls([default_img]);
      setInitialLoad(false);
    }
  }, [default_img, initialLoad]);

  useEffect(() => {
    setImgUrl([imgUrls.join(",")]);
  }, [imgUrls, setImgUrl]);

  const handleMultipleUploads = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const filePromises = Array.from(files)
      .slice(0, 10)
      .map((file, index) => {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        const fakeEvent = {
          target: { files: dataTransfer.files },
        } as React.ChangeEvent<HTMLInputElement>;

        console.log(`Uploading file ${index + 1}:`, file.name); // Debugging the file upload
        return handleImageUpload(fakeEvent);
      });

    // Wait for all uploads to complete
    await Promise.all(filePromises);
  };

  // Function to remove image (works for any index)
  const removeImage = (index: number) => {
    setImgUrls((prev) => {
      const updatedImgUrls = [...prev]; // Create a copy of the array
      updatedImgUrls.splice(index, 1); // Remove the image at the specified index
      return updatedImgUrls; // Return the updated array
    });
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
      <p className="text-base text-black mb-4">Upload Additional Images</p>
      <div className="text-center flex flex-wrap items-center justify-center gap-2">
        {/* Display uploaded images */}
        {imgUrls.length > 0 ? (
          imgUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`uploaded-img-${index}`}
                className="w-20 h-20 object-cover rounded-md"
              />
              <button
                onClick={() => removeImage(index)} // Remove image on click
                className="absolute top-0 right-0 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                <span className="text-xl">x</span>
              </button>
            </div>
          ))
        ) : isSubmitted ? (
          <DefaultUploadImg wh={100} />
        ) : isLoading ? (
          <Loading loading={isLoading} spinner="fade" />
        ) : (
          <DefaultUploadImg img={default_img} isLoading={isLoading} wh={100} />
        )}
      </div>

      <div className="mt-8">
        <input
          onChange={handleMultipleUploads}
          type="file"
          name="images"
          id="product_imgs"
          className="hidden"
          multiple
          accept="image/*"
        />
        {!isLoading && imgUrls.length < 10 && (
          <label
            htmlFor="product_imgs"
            className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
          >
            Upload Images
          </label>
        )}
      </div>

      {isLoading && (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="mt-4"
        >
          <Loading loading={isLoading} spinner="fade" />
        </div>
      )}
    </div>
  );
};

export default ProductAdditionalImagesUpload;
