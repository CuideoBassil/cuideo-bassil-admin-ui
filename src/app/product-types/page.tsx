import Wrapper from "@/layout/wrapper";
import AddBrand from "../components/brand/add-brand";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddProductType from "../components/product-type/add-product-type";
import Image from "next/image";

const BrandPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Products Types" subtitle="Products Types" />
        {/* breadcrumb end */}

        {/*add ProductType area start */}
        <AddProductType />
        {/*add ProductType area end */}
      </div>
    </Wrapper>
  );
};

export default BrandPage;
