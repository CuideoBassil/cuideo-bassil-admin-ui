"use client";
import {
  useAddProductMutation,
  useEditProductMutation,
} from "@/redux/product/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

// Type Definitions
export interface ImageURL {
  color: {
    name?: string;
    clrCode?: string;
  };
  img: string;
  sizes?: string[];
}

type IBrand = { name: string; id: string };
type IColor = { name: string; code: string };
type ICategory = { name: string; id: string };
type IProductType = { name: string; id: string };

type Status = "in-stock" | "out-of-stock" | "discontinued";

const useProductSubmit = () => {
  const [sku, setSku] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [unit, setUnit] = useState<string>("1");
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [children, setChildren] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  // Brand state, ensuring it has name and id properties
  const [brand, setBrand] = useState<IBrand>({ name: "", id: "" });

  const [color, setColor] = useState<IColor>({ name: "", code: "" });
  const [category, setCategory] = useState<ICategory>({ name: "", id: "" });
  const [status, setStatus] = useState<Status>("in-stock");
  const [productType, setProductType] = useState<IProductType>({
    name: "",
    id: "",
  });
  const [description, setDescription] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [offerDate, setOfferDate] = useState<{ startDate: any; endDate: any }>({
    startDate: null,
    endDate: null,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();

  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  // Reset Form Function
  const resetForm = () => {
    setSku("");
    setImg("");
    setTitle("");
    setSlug("");
    setUnit("1");
    setImageURLs([]);
    setChildren("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    setBrand({ name: "", id: "" }); // Reset brand here
    setCategory({ name: "", id: "" });
    setStatus("in-stock");
    setProductType({ name: "", id: "" });
    setColor({ name: "", code: "" });
    setDescription("");
    setVideoId("");
    setOfferDate({ startDate: null, endDate: null });
    setTags([]);
    setSizes([]);
    reset();
  };

  // Submit Product Function
  const handleSubmitProduct = async (data: any) => {
    const productData = {
      sku: data.SKU,
      image: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit,
      additionalImages: imageURLs,
      parent: category.name,
      children,
      price: +data.price,
      discount: +data.discount_price,
      quantity: +data.quantity,
      brand, // Ensure brand is passed correctly
      category,
      color,
      status: (data.quantity > 0 ? "in-stock" : "out-of-stock") as Status,
      offerDate,
      productType,
      description: data.description,
      videoId: data.youtube_video_Id,
      tags,
    };

    if (!img) return notifyError("Product image is required");
    if (!category.name) return notifyError("Category is required");
    if (+data.discount_price > +data.price)
      return notifyError("Price must be greater than discount");

    try {
      const res = await addProduct(productData).unwrap();
      notifySuccess("Product created successfully");
      setIsSubmitted(true);
      resetForm();
      router.push("/product-list");
    } catch (error: any) {
      notifyError(error?.data?.message || "Failed to create product");
    }
  };

  // Edit Product Function
  const handleEditProduct = async (data: any, id: string) => {
    const productData = {
      sku: data.SKU,
      image: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit,
      additionalImages: imageURLs,
      parent: category.name,
      children,
      price: +data.price,
      discount: +data.discount_price,
      quantity: +data.quantity,
      brand, // Ensure brand is passed here as well
      category,
      color,
      status: (data.quantity > 0 ? "in-stock" : "out-of-stock") as Status,
      offerDate,
      productType,
      description: data.description,
      videoId: data.youtube_video_Id,
      tags,
    };

    try {
      await editProduct({ id, data: productData }).unwrap();
      notifySuccess("Product edited successfully");
      setIsSubmitted(true);
      router.push("/product-list");
      resetForm();
    } catch (error: any) {
      notifyError(error?.data?.message || "Failed to edit product");
    }
  };

  return {
    sku,
    setSku,
    img,
    setImg,
    title,
    setTitle,
    slug,
    setSlug,
    unit,
    setUnit,
    imageURLs,
    setImageURLs,
    children,
    setChildren,
    price,
    setPrice,
    discount,
    setDiscount,
    quantity,
    setQuantity,
    brand,
    setBrand,
    category,
    setCategory,
    color,
    setColor,
    status,
    setStatus,
    productType,
    setProductType,
    description,
    setDescription,
    videoId,
    setVideoId,
    tags,
    setTags,
    sizes,
    setSizes,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    offerDate,
    setOfferDate,
    setIsSubmitted,
    isSubmitted,
  };
};

export default useProductSubmit;
