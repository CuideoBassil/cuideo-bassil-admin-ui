type Brand = {
  name: string;
  id: string;
};

type Category = {
  name: string;
  id: string;
};
type ProductType = {
  name: string;
  id: string;
};

type Color = {
  name: string;
  code: string;
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
  userId: IReviewUser;
  productId: string;
  rating: number;
  comment: string;
  updatedAt: string;
  createdAt: string;
};

export interface IProduct {
  _id: string;
  brand: Brand;
  category: Category;
  sku: string;
  image: string;
  title: string;
  slug?: string;
  unit?: string;
  additionalImages: any[];
  parent: string;
  children: string;
  color: Color;
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

// IAddProduct
export interface IAddProduct {
  sku: string;
  image: string;
  title: string;
  slug?: string;
  unit: string;
  additionalImages: string[];
  parent: string;
  children: string;
  price: number;
  discount: number;
  quantity: number;
  brand: { name: string; id: string };
  category: { name: string; id: string };
  color: { name: string; code: string };
  status: "in-stock" | "out-of-stock" | "discontinued";
  productType: { name: string; id: string };
  description: string;
  videoId?: string;
  additionalInformation?: any;
  tags?: string[];
  sizes?: string[];
  offerDate?: {
    startDate: string | null;
    endDate: string | null;
  };
}

// IUpdateProductQuantity
export interface IUpdateProductQuantity {
  sku: string;
  quantity: number;
}

// review product response
export interface IReviewProductRes {
  success: boolean;
  data: IProduct[];
}
// delete review product response
export interface IDelReviewsRes {
  success: boolean;
  message: string;
}
