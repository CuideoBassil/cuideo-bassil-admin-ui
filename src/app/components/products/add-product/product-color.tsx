import { Sketch } from "@uiw/react-color";
import { useEffect } from "react";

type IColorType = {
  name: string;
  code: string;
};

type IPropType = {
  defaul_value?: { name: string; code: string };
  color: IColorType;
  setColor: React.Dispatch<React.SetStateAction<IColorType>>;
};

const ProductColor = ({ defaul_value, color, setColor }: IPropType) => {
  useEffect(() => {
    if (
      defaul_value &&
      (color.name !== defaul_value.name || color.code !== defaul_value.code)
    ) {
      setColor({ name: defaul_value.name, code: defaul_value.code });
    }
  }, [defaul_value, setColor]);

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="mt-10 pt-10 border-t border-gray relative">
        <div className="grid sm:grid-cols-2 gap-x-6">
          {/* Color Name Input */}
          <div className="mb-5">
            <label
              htmlFor="clrName"
              className="mb-0 text-base text-black block"
            >
              Color Name <span className="text-red">*</span>
            </label>
            <input
              id="clrName"
              aria-label="Color Name"
              className="input w-full h-11 rounded-md border border-gray6 px-6 text-base"
              type="text"
              value={color.name}
              placeholder="Color Name"
              onChange={(e) =>
                setColor((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <span className="text-tiny leading-4">
              Set the Color name of the product.
            </span>
          </div>

          {/* Color Picker */}
          <div className="flex flex-col mb-5">
            <p className="mb-0 text-base text-black">Color</p>
            <Sketch
              className="w-full"
              color={color.code}
              disableAlpha
              onChange={(updatedColor) =>
                setColor((prev) => ({ ...prev, code: updatedColor.hex }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductColor;
