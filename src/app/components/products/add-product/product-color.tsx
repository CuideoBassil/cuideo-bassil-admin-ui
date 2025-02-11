import { Sketch } from "@uiw/react-color";

// Prop type
type IColorType = {
  name: string;
  code: string;
};

type IPropType = {
  color: IColorType;
  setColor: React.Dispatch<React.SetStateAction<IColorType>>;
};

const ProductColor = ({ color, setColor }: IPropType) => {
  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <h4 className="text-[22px]">Product Color</h4>
      <div className="mt-10 pt-10 border-t border-gray relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-6">
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Color Name</p>
            <input
              id="clrName"
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              type="text"
              placeholder="Color Name"
              value={color?.name}
              onChange={(e) => {
                setColor({ ...color, name: e.target.value });
              }}
            />
            <span className="text-tiny leading-4">
              Set the Color name of product.
            </span>
          </div>
          <div className="flex flex-col mb-5">
            <p className="mb-0 text-base text-black">Background Color</p>
            <Sketch
              style={{ width: "100%" }}
              color={color.code}
              disableAlpha={true}
              onChange={(updatedColor) => {
                setColor({ ...color, code: updatedColor.hex });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductColor;
