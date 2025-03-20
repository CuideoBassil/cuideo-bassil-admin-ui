import {
  DeliveryDistrictDelResponse,
  DeliveryDistrictResponse,
  IAddDeliveryDistrict,
  IDeliveryDistrictAddResponse,
} from "@/types/delivery-district-type";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all deliveryDistricts
    getAllDeliveryDistricts: builder.query<DeliveryDistrictResponse, void>({
      query: () => `/api/deliveryDistrict/all`,
      providesTags: ["AllDeliveryDistricts"],
      keepUnusedDataFor: 600,
    }),
    // add
    addDeliveryDistrict: builder.mutation<
      IDeliveryDistrictAddResponse,
      IAddDeliveryDistrict
    >({
      query(data: IAddDeliveryDistrict) {
        return {
          url: `/api/deliveryDistrict/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllDeliveryDistricts"],
    }),
    // edit
    editDeliveryDistrict: builder.mutation<
      IDeliveryDistrictAddResponse,
      { id: string; data: Partial<IAddDeliveryDistrict> }
    >({
      query({ id, data }) {
        return {
          url: `/api/deliveryDistrict/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllDeliveryDistricts", "getDeliveryDistrict"],
    }),
    // get single product
    getDeliveryDistrict: builder.query<IAddDeliveryDistrict, string>({
      query: (id) => `/api/deliveryDistrict/get/${id}`,
      providesTags: ["getDeliveryDistrict"],
    }),
    // delete deliveryDistrict
    deleteDeliveryDistrict: builder.mutation<
      DeliveryDistrictDelResponse,
      string
    >({
      query(id: string) {
        return {
          url: `/api/deliveryDistrict/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllDeliveryDistricts"],
    }),
  }),
});

export const {
  useGetAllDeliveryDistrictsQuery,
  useDeleteDeliveryDistrictMutation,
  useAddDeliveryDistrictMutation,
  useEditDeliveryDistrictMutation,
  useGetDeliveryDistrictQuery,
} = authApi;
