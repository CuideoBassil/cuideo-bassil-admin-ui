import EditDeliveryDistrict from "@/app/components/delivery-district/edit-delivery-district";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

const DeliveryDistrictPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Delivery Districts" subtitle="Delivery Districts" />
        {/* breadcrumb end */}

        {/*add category area start */}
        <EditDeliveryDistrict id={params.id} />
        {/*add category area end */}
      </div>
    </Wrapper>
  );
};

export default DeliveryDistrictPage;
