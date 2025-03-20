export interface ProductType {
  _id: string;
  name: string;
  image: string;
}

export interface ProductTypeResponse {
  success: boolean;
  result: ProductType[];
}

export interface ProductTypeDelResponse {
  success: boolean;
  message: string;
}

export interface IAddProductType {
  name: string;
  image: string;
}

export interface IProductTypeAddResponse {
  success: boolean;
  message: string;
  data: ProductType;
}
