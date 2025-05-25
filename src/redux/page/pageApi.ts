import { apiSlice } from "../api/apiSlice";

export const pageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPage: builder.mutation<any, any>({
      query(data: any) {
        return {
          url: `/api/page/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllPages"],
    }),
    editPage: builder.mutation<any, { id: string; data: Partial<any> }>({
      query({ id, data }) {
        return {
          url: `/api/page/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllPages"],
    }),
    // editPage: builder.mutation<any, any>({
    //   query({ id, data }) {
    //     return {
    //       url: `/api/page/edit/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["AllPages"],
    // }),
    getPageByKey: builder.query({
      query: (key) => ({
        url: `/api/page/get/${key}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddPageMutation, useEditPageMutation, useGetPageByKeyQuery } =
  pageApi;
