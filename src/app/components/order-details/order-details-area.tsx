"use client";
import {
  useGetSingleOrderQuery,
  useUpdateStatusMutation,
} from "@/redux/order/orderApi";
import { Invoice } from "@/svg";
import { notifyError } from "@/utils/toast";
import dayjs from "dayjs";
import { useRef } from "react";
import ReactSelect from "react-select";
import { useReactToPrint } from "react-to-print";
import ErrorMsg from "../common/error-msg";

const OrderDetailsArea = ({ id }: { id: string }) => {
  const { data: orderData, isLoading, isError } = useGetSingleOrderQuery(id);
  const printRef = useRef<HTMLDivElement | null>(null);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && orderData) {
    let order = orderData.data;

    content = (
      <>
        <div className="container grid px-6 mx-auto">
          <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
            Invoice
          </h1>
          <div
            ref={printRef}
            className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden"
          >
            <div className=" mb-7">
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-slate-200">
                <h1 className="font-bold font-heading text-xl uppercase">
                  Invoice
                  {/* <p className="text-base mt-1 text-gray-500">
                    Status:
                    <span className="pl-2 font-medium text-base capitalize">
                      <span className="font-heading">
                        <span className="inline-flex px-2 text-base font-medium leading-5 rounded-full">
                          {order.status}
                        </span>
                      </span>
                    </span>
                  </p> */}
                </h1>
                <div className="lg:text-right text-left">
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                    {order.deliveryDistrict?.name}, {order.city}
                    <br />
                    St: {order.street}, Bdg: {order.building} / {order.floor}
                  </p>
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                  <span className="font-bold text-base uppercase block">
                    DATE
                  </span>
                  <span className="text-base block">
                    <span>
                      {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                  <span className="font-bold text-base uppercase block">
                    INVOICE #
                  </span>
                  {/* <span className="text-base block">{order.invoice}</span> */}
                </div>
                <div className="flex flex-col lg:text-right text-left">
                  <span className="font-bold text-base uppercase block">
                    INVOICE TO
                  </span>
                  <span className="text-base text-gray-500 block">
                    {order?.fullName} <br />
                    <span className="ml-2">{order.phoneNumber}</span>
                  </span>
                </div>
              </div>{" "}
              <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                  <span className="font-bold text-base uppercase block">
                    Note
                  </span>
                  <span className="text-base block">
                    <span>{order.orderNote}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-12">
              <div className="relative rounded-b-md bg-white">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-base text-left text-gray-500 whitespace-no-wrap">
                    <thead className="bg-white">
                      <tr className="border-b border-gray6 text-tiny">
                        <td className="pl-3 py-3 text-tiny text-textBody uppercase font-semibold">
                          SR.
                        </td>
                        <td className="pr-8 py-3 text-tiny text-textBody uppercase font-semibold">
                          Product Title
                        </td>
                        <td className="pr-8 py-3 text-tiny text-textBody uppercase font-semibold text-center">
                          QUANTITY
                        </td>
                        <td className="pr-3 py-3 text-tiny text-textBody uppercase font-semibold text-center">
                          ITEM PRICE
                        </td>
                        <td className="pr-3 py-3 text-tiny text-textBody uppercase font-semibold text-right">
                          AMOUNT
                        </td>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y text-base ">
                      {order.detailedProducts.map((item: any, i: number) => (
                        <tr key={i} className="">
                          <td className="bg-white border-b border-gray6 px-3 py-3 text-start">
                            {i + 1}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 pl-0 py-3 text-start">
                            {item.title}/ {item.sku}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 py-3 font-bold text-center">
                            {item.quantity}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 py-3 font-bold text-center">
                            ${item.discountedPrice?.toFixed(2)}
                          </td>
                          <td className="bg-white border-b border-gray6 px-3 py-3 text-right font-bold">
                            ${(item.discountedPrice * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-8 py-6">
              <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold text-base uppercase block">
                    PAYMENT METHOD
                  </span>
                  <span className="text-base font-semibold block">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold text-base uppercase block">
                    SHIPPING COST
                  </span>
                  <span className="text-base font-semibold font-heading block">
                    ${order.deliveryDistrict.deliveryCost.toFixed(2) || 0}
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold font-heading text-base uppercase block">
                    PRICE
                  </span>
                  <span className="text-base text-gray-500 font-semibold font-heading block">
                    $
                    {(
                      order?.discountedAmount -
                      order.deliveryDistrict.deliveryCost
                    ).toFixed(2) || 0}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold text-base uppercase block">
                    TOTAL AMOUNT
                  </span>
                  <span className="text-xl font-bold block">
                    $ {order?.discountedAmount.toFixed(2) || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handlePrint = useReactToPrint({
    content: () => printRef?.current,
    documentTitle: "Receipt",
  });

  const handlePrintReceipt = async () => {
    try {
      handlePrint();
    } catch (err) {
      notifyError("Failed to print");
    }
  };
  const options = [
    { value: "delivered", label: "Delivered" },
    { value: "processing", label: "Processing" },
    { value: "pending", label: "Pending" },
    { value: "cancel", label: "canceled" },
  ];
  const [updateStatus] = useUpdateStatusMutation();
  const handleChange = async (value: string | undefined, id: string) => {
    if (value) {
      const res = await updateStatus({ id, status: { status: value } });
    }
  };

  return (
    <>
      {!isLoading && !isError && orderData && (
        <>
          <div className="container grid px-6 mx-auto">
            <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
              Status
            </h1>
            <div className="bg-white mb-4  p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden">
              <ReactSelect
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                }}
                defaultValue={options.find(
                  (option) => option.value === orderData?.data.status
                )}
                onChange={(value) => handleChange(value?.value, id)}
                options={options}
                menuPortalTarget={document.body}
              />
            </div>
          </div>
          {/* <div className="container grid px-6 mx-auto">
            <div className="mb-4 mt-3 flex justify-between">
              <button onClick={handlePrintReceipt} className="tp-btn px-5 py-2">
                Change Status
              </button>
            </div>
          </div> */}
        </>
      )}
      <div className="">{content}</div>
      <div className="container grid px-6 mx-auto">
        <div className="mb-4 mt-3 flex justify-between">
          <button onClick={handlePrintReceipt} className="tp-btn px-5 py-2">
            Print Invoice
            <span className="ml-2">
              <Invoice />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsArea;
