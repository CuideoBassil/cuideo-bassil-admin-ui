import dayjs from "dayjs";
import React, { useState } from "react";
// internal
import usePagination from "@/hooks/use-pagination";
import { useGetAllOrdersQuery } from "@/redux/order/orderApi";
import { Search } from "@/svg";
import ErrorMsg from "../common/error-msg";
import Pagination from "../ui/Pagination";
import OrderActions from "./order-actions";

const OrderTable = () => {
  const { data: orders, isError, isLoading, error } = useGetAllOrdersQuery();
  const [searchVal, setSearchVal] = useState<string>("");
  const [selectVal, setSelectVal] = useState<string>("");
  const paginationData = usePagination(orders?.data || [], 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && orders?.data.length === 0) {
    content = <ErrorMsg msg="No Orders Found" />;
  }

  if (!isLoading && !isError && orders?.success) {
    let orderItems = [...currentItems];
    if (searchVal) {
      orderItems = orderItems.filter(
        (v) =>
          v.fullName.toString().includes(searchVal) ||
          v.phoneNumber.includes(searchVal)
      );
    }
    if (selectVal) {
      orderItems = orderItems.filter(
        (v) => v.status.toLowerCase() === selectVal.toLowerCase()
      );
    }

    content = (
      <>
        <table className="w-[1500px] 2xl:w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th
                scope="col"
                className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold "
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
              >
                discounted amount
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  text-end"
              >
                District
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  text-end"
              >
                City
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  text-end"
              >
                Street
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  text-end"
              >
                Bldg / Floor
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  text-end"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  text-end"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold  text-end"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item: any) => (
              <tr
                key={item._id}
                className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
              >
                <td className="px-3 py-3 font-normal text-[#55585B]">
                  <div>
                    <div>{item.fullName}</div>
                    <div className="text-gray-400">{item.phoneNumber}</div>
                  </div>
                </td>
                <td className="pr-8 py-5 whitespace-nowrap">
                  {item.discountedAmount.toFixed(2)} $
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {item.deliveryDistrict.name}
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {item.city}
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {item.street}
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {item.building} / {item.floor}
                </td>
                <td className="px-3 py-3 text-end">
                  <span
                    className={`text-[11px] ${
                      item.status === "pending"
                        ? "text-warning bg-warning/10"
                        : item.status === "delivered"
                        ? "text-success bg-success/10"
                        : item.status === "processing"
                        ? "text-indigo-500 bg-indigo-100"
                        : item.status === "cancel"
                        ? "text-danger bg-danger/10"
                        : ""
                    } px-3 py-1 rounded-md leading-none font-medium text-end`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                </td>
                {/* order actions */}
                <OrderActions id={item._id} />
                {/* order actions */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination start */}
        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">
            Showing 1-{currentItems.length} of {orders?.data.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center sm:mx-8 pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
        {/* pagination end */}
      </>
    );
  }

  // handle change input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  // handle change input
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectVal(e.target.value);
  };
  return (
    <>
      <div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
        <div className="search-input relative">
          <input
            className="input h-[44px] w-full pl-14"
            type="text"
            placeholder="customer"
            onChange={handleSearchChange}
          />
          <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
            <Search />
          </button>
        </div>
        <div className="flex justify-end space-x-6">
          <div className="search-select mr-3 flex items-center space-x-3 ">
            <span className="text-tiny inline-block leading-none -translate-y-[2px]">
              Status :{" "}
            </span>
            <select onChange={handleSelectChange}>
              <option value="">Status</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto mx-8">{content}</div>
    </>
  );
};

export default OrderTable;
