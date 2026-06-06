"use client";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import ImportProducts from "../components/products/import/import-products";

const ImportProductsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Import Products" subtitle="Import Products" />
        {/* breadcrumb end */}

        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <ImportProducts />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ImportProductsPage;
