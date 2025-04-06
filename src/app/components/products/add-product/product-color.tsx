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

// ✅ List of predefined colors
const presetColors: IColorType[] = [
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
  { name: "Silver", code: "#C0C0C0" },
  { name: "Brown", code: "#964B00" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Red", code: "#FF0000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Green", code: "#00FF00" },
];

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
          <div>
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
            {/* Preset Color Boxes */}
            <div className="flex flex-wrap gap-6 mb-4">
              {presetColors.map((preset) => (
                <div>
                  <div
                    key={preset.name}
                    className={`w-8 h-8 rounded border-2 cursor-pointer`}
                    title={preset.name}
                    style={{
                      backgroundColor: preset.code,
                      borderColor:
                        color.code === preset.code ? "#2563eb" : "#d1d5db",
                    }}
                    onClick={() => setColor(preset)}
                  />
                  <div>{preset.name}</div> <div>{preset.code}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Picker + Presets */}
          <div className="flex flex-col mb-5">
            <p className="mb-0 text-base text-black mb-2">Color</p>

            {/* Sketch Picker */}
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
