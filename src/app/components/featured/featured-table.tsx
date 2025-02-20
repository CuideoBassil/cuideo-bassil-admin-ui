"use client";
import usePagination from "@/hooks/use-pagination";
import { useGetAllFeaturedQuery } from "@/redux/featured/featuredApi";
import Image from "next/image";
import ErrorMsg from "../common/error-msg";
import Pagination from "../ui/Pagination";
import FeaturedEditDelete from "./featured-edit-del";

const FeaturedTables = () => {
  const { data: featured, isError, isLoading } = useGetAllFeaturedQuery();
  const paginationData = usePagination(featured?.data || [], 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && featured?.data.length === 0) {
    content = <ErrorMsg msg="No Items Found" />;
  }

  if (!isLoading && !isError && currentItems) {
    content = (
      <>
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[975px] 2xl:w-full">
            <table className="w-full text-base text-left text-gray-500 ">
              <thead>
                <tr className="border-b border-gray6 text-tiny">
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end"
                  >
                    Discounted
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end"
                  >
                    Section
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end"
                  >
                    Background
                  </th>

                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...currentItems.reverse()].map((item: any) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b border-gray6 last:border-0 text-start mx-9 items-center justify-center"
                  >
                    <td className="pr-8 py-5 whitespace-nowrap">
                      <a href="#" className="flex items-center space-x-5">
                        <span className="font-medium text-heading text-hover-primary transition">
                          {item.title}
                        </span>
                      </a>
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.description.slice(0, 20)}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.price}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.discounted}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.section}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.img && (
                        <Image
                          className="w-10 h-10 rounded-full object-contain"
                          src={item.img}
                          alt="image"
                          width={40}
                          height={40}
                        />
                      )}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] ">
                      <div
                        className="w-10 h-10 rounded-full"
                        style={{
                          backgroundColor: `${item.background}`
                            ? item.background
                            : "red",
                        }}
                      />
                    </td>

                    <td className="px-9 py-3 text-end">
                      <div className="flex items-center justify-end space-x-2">
                        <FeaturedEditDelete id={item._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">
            Showing 1-{currentItems.length} of {featured?.data.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
      {content}
    </div>
  );
};

export default FeaturedTables;
