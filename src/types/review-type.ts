type Brand = {
  name: string;
  id: string;
};

type Category = {
  name: string;
  id: string;
};

type ProductType = { id: string; name: string };

type Color = {
  name: string;
  clrCode: string;
};

type ImageURL = {
  color?: Color;
  img: string;
};

type AdditionalInformation = {
  key: string;
  value: string;
};

type IReviewUser = {
  _id: string;
  name: string;
  email: string;
};

type TReview = {
  _id: string;
  name: IReviewUser;
  productId: string;
  rating: number;
  comment: string;
  email: string;
  phoneNumber: string;
  updatedAt: string;
  createdAt: string;
};

export interface TReviewInterface {
  _id: string;
  name: IReviewUser;
  productId: string;
  rating: number;
  comment: string;
  email: string;
  phoneNumber: string;
  updatedAt: string;
  createdAt: string;
}

export interface IProduct {
  _id: string;
  brand: Brand;
  category: Category;
  sku: string;
  img: string;
  title: string;
  slug?: string;
  unit?: string;
  imageURLs: ImageURL[];
  parent: string;
  children: string[];
  price: number;
  discount?: number;
  quantity: number;
  status: "in-stock" | "out-of-stock" | "discontinued";
  reviews?: TReview[];
  productType: ProductType;
  description: string;
  additionalInformation?: AdditionalInformation[];
  offerDate?: {
    startDate: string;
    endDate: string;
  };
  featured?: boolean;
  sellCount?: number;
  sizes?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  orderQuantity: number;
}

export interface ProductResponse {
  success: boolean;
  data: IProduct[];
}

// IAddProduct interface for product addition
export interface IAddProduct {
  title: string;
  brand: { id: string; name: string };
  category: { id: string; name: string };
  sku: string;
  image: string; // Primary image
  additionalImages?: string[]; // Additional images
  slug: string;
  unit?: string;
  tags?: string[];
  parent?: string;
  children?: string[]; // Fixed: should be an array
  price: number;
  discount?: number;
  quantity: number;
  status?: "in-stock" | "out-of-stock" | "discontinued";
  productType?: { id: string; name: string };
  description?: string;
  additionalInformation?: string; // Changed from object array to string
  offerDate?: {
    startDate?: string | null;
    endDate?: string | null;
  };
}

// IUpdateProductQuantity interface for updating product quantity
export interface IUpdateProductQuantity {
  sku: string;
  quantity: number;
}

// Review product response interface
export interface IReviewProductRes {
  success: boolean;
  data: IProduct[];
}

// Delete review product response interface
export interface IDelReviewsRes {
  success: boolean;
  message: string;
}
