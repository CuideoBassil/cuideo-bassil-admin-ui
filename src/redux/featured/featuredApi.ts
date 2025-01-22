import {
  FeaturedDelResponse,
  FeaturedResponse,
  IAddFeatured,
  IFeaturedAddResponse,
} from "@/types/featured-type";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all featured
    getAllFeatured: builder.query<FeaturedResponse, void>({
      query: () => `/api/featured/all`,
      providesTags: ["AllFeatured"],
      keepUnusedDataFor: 600,
    }),

    // get featured by section
    getFeaturedBySection: builder.query({
      query: (section) => `/api/featured/${section}`,
      providesTags: ["FeaturedBySection"],
    }),
    // add featured
    addFeatured: builder.mutation<IFeaturedAddResponse, IAddFeatured>({
      query(data: IAddFeatured) {
        return {
          url: `/api/featured/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllFeatured"],
    }),
    // editFeatured
    editFeatured: builder.mutation<
      IFeaturedAddResponse,
      { id: string; data: Partial<IAddFeatured> }
    >({
      query({ id, data }) {
        return {
          url: `/api/featured/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllFeatured", "getFeatured"],
    }),
    // get single featured
    getFeatured: builder.query<IAddFeatured, string>({
      query: (id) => `/api/featured/get/${id}`,
      providesTags: ["getFeatured"],
    }),
    // delete featured
    deleteFeatured: builder.mutation<FeaturedDelResponse, string>({
      query(id: string) {
        return {
          url: `/api/featured/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllFeatured"],
    }),
  }),
});

export const {
  useGetAllFeaturedQuery,
  useDeleteFeaturedMutation,
  useAddFeaturedMutation,
  useEditFeaturedMutation,
  useGetFeaturedQuery,
  useGetFeaturedBySectionQuery,
} = authApi;
