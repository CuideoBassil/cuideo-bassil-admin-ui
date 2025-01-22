import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddFeatured from "../components/featured/add-featured";

const CategoryPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Featured" subtitle="Featured Products" />
        {/* breadcrumb end */}

        {/*add featured area start */}
        <AddFeatured />
        {/*add featured area end */}
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
