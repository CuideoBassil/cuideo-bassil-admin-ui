"use client";
import usePageSubmit from "@/hooks/usePageSubmit";
import Wrapper from "@/layout/wrapper";
import { useGetPageByKeyQuery } from "@/redux/page/pageApi";
import { useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import PageComp from "../components/pages/page-comp";

const AboutUs = () => {
  const { handleSubmit, errors, setData, handleSubmitEditPage } =
    usePageSubmit();
  const { data: page, isLoading } = useGetPageByKeyQuery("about");

  useEffect(() => {
    if (page) setData(JSON.parse(page?.data?.data));
  }, [page]);

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="About Us" subtitle="About Us" />
        {/* breadcrumb end */}
        {!isLoading && page && (
          <PageComp
            errors={errors}
            handleSubmit={handleSubmit}
            handleSubmitPage={handleSubmitEditPage}
            setData={setData}
            data={JSON.parse(page?.data?.data) || ""}
            title={"About Us"}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default AboutUs;
