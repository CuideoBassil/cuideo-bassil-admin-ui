import { IDelReviewsRes } from "@/types/product-type";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // delete review product
    deleteReviews: builder.mutation<IDelReviewsRes, string>({
      query(id) {
        return {
          url: `/api/review/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ReviewProducts"],
    }),

    //delete single review
    deleteSingleReview: builder.mutation<IDelReviewsRes, string>({
      query(id) {
        return {
          url: `/api/review/delete/single/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["DeleteSingleReview"],
    }),
  }),
});

export const { useDeleteReviewsMutation, useDeleteSingleReviewMutation } =
  authApi;
