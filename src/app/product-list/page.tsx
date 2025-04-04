import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import ProductListArea from "../components/products/product-lists/product-list-area";

const ProductList = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Products" subtitle="Products List" />
        {/* breadcrumb end */}

        {/* ProductListArea start */}
        <ProductListArea />
        {/* ProductListArea end */}
      </div>
    </Wrapper>
  );
};

export default ProductList;
