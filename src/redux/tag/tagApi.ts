import {
  IAddTag,
  ITagAddResponse,
  TagDelResponse,
  TagResponse,
} from "@/types/tag-type";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all tags
    getAllTags: builder.query<TagResponse, void>({
      query: () => `/api/tag/all`,
      providesTags: ["AllTags"],
      keepUnusedDataFor: 600,
    }),
    // add category
    addTag: builder.mutation<ITagAddResponse, IAddTag>({
      query(data: IAddTag) {
        return {
          url: `/api/tag/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllTags"],
    }),
    // editCategory
    editTag: builder.mutation<
      ITagAddResponse,
      { id: string; data: Partial<IAddTag> }
    >({
      query({ id, data }) {
        return {
          url: `/api/tag/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllTags", "getTag"],
    }),
    // get single product
    getTag: builder.query<IAddTag, string>({
      query: (id) => `/api/tag/get/${id}`,
      providesTags: ["getTag"],
    }),
    // delete tag
    deleteTag: builder.mutation<TagDelResponse, string>({
      query(id: string) {
        return {
          url: `/api/tag/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllTags"],
    }),
  }),
});

export const {
  useGetAllTagsQuery,
  useDeleteTagMutation,
  useAddTagMutation,
  useEditTagMutation,
  useGetTagQuery,
} = authApi;
