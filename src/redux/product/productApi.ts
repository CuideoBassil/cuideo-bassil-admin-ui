import {
  IAddProduct,
  IReviewProductRes,
  IUpdateProductQuantity,
  ProductResponse,
} from "@/types/product-type";
import { apiSlice } from "../api/apiSlice";

interface IProductResponse {
  success: boolean;
  status: string;
  message: string;
  data: any;
}

interface IProductEditResponse {
  data: IAddProduct;
  message: string;
}

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // getUserOrders
    getAllProducts: builder.query<ProductResponse, void>({
      query: () => `/api/product/all`,
      providesTags: ["AllProducts"],
      keepUnusedDataFor: 600,
    }),
    // add product
    addProduct: builder.mutation<IProductResponse, IAddProduct>({
      query(data: IAddProduct) {
        return {
          url: `/api/product/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllProducts"],
    }),
    // edit product
    editProduct: builder.mutation<
      IProductEditResponse,
      { id: string; data: Partial<IAddProduct> }
    >({
      query({ id, data }) {
        return {
          url: `/api/product/edit-product/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllProducts"],
    }),
    // get single product
    // getProduct: builder.query<IAddProduct, string>({
    //   query: (id) => `/api/product/single-product/${id}`,
    // }),
    getProduct: builder.query({
      query: (id) => `/api/product/single-product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    // get single product
    getReviewProducts: builder.query<IReviewProductRes, void>({
      query: () => `/api/product/review-product`,
      providesTags: ["ReviewProducts"],
      keepUnusedDataFor: 0, // Disable cache when component unmounts
    }),
    // get single product
    getStockOutProducts: builder.query<IReviewProductRes, void>({
      query: () => `/api/product/stock-out`,
      providesTags: ["StockOutProducts"],
    }),
    // delete category
    deleteProduct: builder.mutation<{ message: string }, string>({
      query(id: string) {
        return {
          url: `/api/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllProducts"],
    }),

    // update product
    updateProductQuantity: builder.mutation<
      IProductEditResponse,
      { data: IUpdateProductQuantity[] }
    >({
      query({ data }) {
        return {
          url: `/api/product/update-quantities`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["UpdateProductQuantity"],
    }),

    getFilteredPaginatedProducts: builder.query({
      query: ({ skip = 0, take = 12, search, status }) => {
        const params = new URLSearchParams();
        params.append("skip", skip.toString());
        params.append("take", take.toString());

        if (search) {
          params.append("search", search);
        }

        if (status) {
          params.append("status", status);
        }

        return `/api/product/filtered/paginated?${params.toString()}`;
      },
      providesTags: ["FilteredPaginatedProducts"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useGetProductQuery,
  useGetReviewProductsQuery,
  useGetStockOutProductsQuery,
  useDeleteProductMutation,
  useUpdateProductQuantityMutation,
  useGetFilteredPaginatedProductsQuery,
} = authApi;
