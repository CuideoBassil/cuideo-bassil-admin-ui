import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import EditProductReviews from "@/app/components/products/edit-product-reviews/edit-product-reviews";
import Wrapper from "@/layout/wrapper";

const EditProduct = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Product Reviews" subtitle="Reviews" />
        {/* breadcrumb end */}

        {/* edit a product start */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 2xl:col-span-10">
            <EditProductReviews id={params.id} />
          </div>
        </div>
        {/* edit a product end */}
      </div>
    </Wrapper>
  );
};

export default EditProduct;
