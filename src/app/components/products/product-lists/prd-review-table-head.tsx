const ProductReviewTableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <th
          scope="col"
          className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] "
        >
          Email
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] "
        >
          Phone
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] "
        >
          Comment
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] "
        >
          Rating
        </th>

        <th
          scope="col"
          className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] "
        >
          Action
        </th>
      </tr>
    </thead>
  );
};

export default ProductReviewTableHead;
