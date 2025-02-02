import {
  ProductTypeResponse,
  IAddProductType,
  IProductTypeAddResponse,
  ProductType,
  ProductTypeDelResponse,
} from "@/types/productType-type";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all productTypes
    getAllProductTypes: builder.query<ProductTypeResponse, void>({
      query: () => `/api/productType/all`,
      providesTags: ["AllProductTypes"],
      keepUnusedDataFor: 600,
    }),
    // add category
    addProductType: builder.mutation<IProductTypeAddResponse, IAddProductType>({
      query(data: IAddProductType) {
        return {
          url: `/api/productType/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllProductTypes"],
    }),
    // editCategory
    editProductType: builder.mutation<
      IProductTypeAddResponse,
      { id: string; data: Partial<IAddProductType> }
    >({
      query({ id, data }) {
        return {
          url: `/api/productType/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllProductTypes", "getProductType"],
    }),
    // get single product
    getProductType: builder.query<IAddProductType, string>({
      query: (id) => `/api/productType/get/${id}`,
      providesTags: ["getProductType"],
    }),
    // delete productType
    deleteProductType: builder.mutation<ProductTypeDelResponse, string>({
      query(id: string) {
        return {
          url: `/api/productType/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllProductTypes"],
    }),
  }),
});

export const {
  useGetAllProductTypesQuery,
  useDeleteProductTypeMutation,
  useAddProductTypeMutation,
  useEditProductTypeMutation,
  useGetProductTypeQuery,
} = authApi;
