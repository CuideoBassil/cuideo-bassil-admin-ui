import EditProductType from "@/app/components/product-type/edit-product-type";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";

const ProductTypePage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Product Types" subtitle="Product Types" />
        {/* breadcrumb end */}

        {/*add category area start */}
        <EditProductType id={params.id} />
        {/*add category area end */}
      </div>
    </Wrapper>
  );
};

export default ProductTypePage;
