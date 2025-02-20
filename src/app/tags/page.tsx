import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddTag from "../components/tag/add-tag";

const BrandPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Tags" subtitle="Tags" />
        {/* breadcrumb end */}

        {/*add Tag area start */}
        <AddTag />
        {/*add Tag area end */}
      </div>
    </Wrapper>
  );
};

export default BrandPage;
