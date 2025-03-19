const ProductTableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <th
          scope="col"
          className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
        >
          Product
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          SKU
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          Price
        </th>
        {/* <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          Description
        </th> */}
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          Rating
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          Brand
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          Category
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          Status
        </th>
        <th
          scope="col"
          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
        >
          Qty
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

export default ProductTableHead;
