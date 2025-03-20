import Wrapper from "@/layout/wrapper";
import AddDeliveryDistrict from "../components/delivery-district/add-delivery-district";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

const DeliveryDistrictPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Delivery Districts" subtitle="Delivery Districts" />
        {/* breadcrumb end */}

        {/*add category area start */}
        <AddDeliveryDistrict />
        {/*add category area end */}
      </div>
    </Wrapper>
  );
};

export default DeliveryDistrictPage;
