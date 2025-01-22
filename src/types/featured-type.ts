export interface Featured {
  _id: string;
  title: string;
  description: string;
  img: string;
  background: string;
  price?: string;
  discounted?: string;
  section: string;
}

export interface FeaturedResponse {
  success: boolean;
  data: Featured[];
}

export interface FeaturedDelResponse {
  success: boolean;
  message: string;
}

export interface IAddFeatured {
  title: string;
  description: string;
  price?: number;
  discounted?: number;
  section: number;
  img: string;
  background: string;
}

export interface IFeaturedAddResponse {
  success: boolean;
  message: string;
  data: Featured;
}
