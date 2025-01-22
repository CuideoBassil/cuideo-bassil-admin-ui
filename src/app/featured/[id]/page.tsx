import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import EditFeatured from "@/app/components/featured/edit-featured";
import Wrapper from "@/layout/wrapper";

const EditFeaturedPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Edit Featured Item" subtitle="Edit Featured Item" />
        {/* breadcrumb end */}

        {/* edit Featured start */}
        <EditFeatured id={params.id} />
        {/* edit Featured end */}
      </div>
    </Wrapper>
  );
};

export default EditFeaturedPage;
