import DataTextarea from "@/app/components/pages/data-textarea";

type PageCompProps = {
  handleSubmit: (
    callback: (...args: any[]) => void
  ) => (e?: React.BaseSyntheticEvent) => void;
  handleSubmitPage: (...args: any[]) => void;
  errors: Record<string, any>;
  setData: (value: string) => void;
  data: string;
  title: string;
};

const PageComp = ({
  handleSubmit,
  handleSubmitPage,
  errors,
  setData,
  data,
  title,
}: PageCompProps) => {
  return (
    <form onSubmit={handleSubmit(() => handleSubmitPage())}>
      <div className="flex flex-col">
        <DataTextarea
          errors={errors}
          defaultValue={data}
          setValue={setData}
          title={title}
        />
      </div>
      <button className="tp-btn px-5 py-2 mt-5" type="submit">
        Submit {title}
      </button>
    </form>
  );
};

export default PageComp;
