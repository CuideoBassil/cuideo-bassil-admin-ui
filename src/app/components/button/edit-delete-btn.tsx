import {
  useDeleteProductMutation,
  useUpdateProductQuantityMutation,
} from "@/redux/product/productApi";
import { Delete, Edit } from "@/svg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import DeleteTooltip from "../tooltip/delete-tooltip";
import EditTooltip from "../tooltip/edit-tooltip";
import ReviewTooltip from "../tooltip/reviews-tooltip";

const EditDeleteBtn = ({ id }: { id: string }) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [deleteProduct, { data: delData }] = useDeleteProductMutation();
  const [updateProductQuantity, { data: deData }] =
    useUpdateProductQuantityMutation();

  const handleDelete = async (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this product ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(productId);
          if ("error" in res) {
            if ("data" in res.error) {
              const errorData = res.error.data as { message?: string };
              if (typeof errorData.message === "string") {
                return notifyError(errorData.message);
              }
            }
          } else {
            notifySuccess(`This product has been deleted.`);
          }
        } catch (error) {}
      }
    });
  };

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
  const handleUpdate = async () => {
    const data = [
      { sku: "RT47CG6002WWIQ", quantity: 0 },
      { sku: "9650ZWCIFSF", quantity: 0 },
      { sku: "ACMK6110IX", quantity: 1 },
      { sku: "212W", quantity: 0 },
      { sku: "RT53K6540SL", quantity: 0 },
      { sku: "RT62K7160SL", quantity: 1 },
      { sku: "24-10", quantity: 0 },
      { sku: "KSWK-2001", quantity: 0 },
      { sku: "KSWK-6001", quantity: 0 },
      { sku: "MSVXBU12HRFN8", quantity: 0 },
      { sku: "WW90TA046AE", quantity: 0 },
      { sku: "SQC1", quantity: 0 },
      { sku: "GRM852HW", quantity: 0 },
      { sku: "WV7142WVP", quantity: 0 },
      { sku: "WV7142SVP", quantity: 0 },
      { sku: "MC40AHC", quantity: 0 },
      { sku: "MC47EGK", quantity: 0 },
      { sku: "MDRC345FZE01", quantity: 3 },
      { sku: "MDRD268FGG28", quantity: 0 },
      { sku: "MDRM632FGG28", quantity: 0 },
      { sku: "MF100W80B/W", quantity: 1 },
      { sku: "WQP15W7633SS", quantity: 1 },
      { sku: "MM723C2GS", quantity: 0 },
      { sku: "HD848FW1", quantity: 1 },
      { sku: "YL1917", quantity: 0 },
      { sku: "ABH80", quantity: 0 },
      { sku: "750DP", quantity: 0 },
      { sku: "LED32HHL", quantity: 1 },
      { sku: "FRZ220S", quantity: 2 },
      { sku: "CB64TW", quantity: 2 },
      { sku: "SG960TX", quantity: 2 },
      { sku: "S95XCS", quantity: 2 },
      { sku: "CB960TGD", quantity: 1 },
      { sku: "CMN0K63X", quantity: 1 },
      { sku: "CMN0K63B", quantity: 1 },
      { sku: "K790TX", quantity: 1 },
      { sku: "K90TDBL", quantity: 2 },
      { sku: "K90TD", quantity: 1 },
      { sku: "JB0115WH", quantity: 1 },
      { sku: "RT38CG6000WWIQ", quantity: 1 },
      { sku: "P90D23AL", quantity: 0 },
      { sku: "QCM20W", quantity: 0 },
      { sku: "NWM7523S", quantity: 1 },
      { sku: "ACS10M", quantity: 0 },
      { sku: "65UR78006L", quantity: 0 },
      { sku: "FP3233SI", quantity: 1 },
      { sku: "JE280", quantity: 0 },
      { sku: "RT45A3010SA", quantity: 0 },
      { sku: "QA65Q70CAUXTW", quantity: 0 },
      { sku: "TG928HN6", quantity: 0 },
      { sku: "KI90TD", quantity: 0 },
      { sku: "FR4083BG", quantity: 0 },
      { sku: "FR4083SS", quantity: 1 },
      { sku: "EY801827", quantity: 0 },
      { sku: "FP402", quantity: 4 },
      { sku: "V12", quantity: 0 },
      { sku: "TLA4", quantity: 0 },
      { sku: "DV90TA040AE", quantity: 0 },
      { sku: "RT38CG60000S9IQ", quantity: 0 },
      { sku: "TNF450", quantity: 0 },
      { sku: "RSF41150", quantity: 0 },
      { sku: "FM90XH04D", quantity: 1 },
      { sku: "NGO608S", quantity: 2 },
      { sku: "SFR4550BK", quantity: 3 },
      { sku: "SFR6550BK", quantity: 1 },
      { sku: "TB95B", quantity: 0 },
      { sku: "WR5011BWG", quantity: 0 },
      { sku: "QLED65KUL", quantity: 0 },
      { sku: "DW911TX", quantity: 1 },
      { sku: "55UR78006L", quantity: 0 },
      { sku: "NTL1524W", quantity: 0 },
      { sku: "NWM1024W", quantity: 2 },
      { sku: "NWM1224S", quantity: 0 },
      { sku: "SBS5051W", quantity: 2 },
      { sku: "SES1710BK", quantity: 1 },
      { sku: "SJE1055SS", quantity: 1 },
      { sku: "SKS5330", quantity: 4 },
      { sku: "SVC45GR", quantity: 2 },
      { sku: "SVC45RD", quantity: 0 },
      { sku: "SVC7500BK", quantity: 0 },
      { sku: "TES1672", quantity: 0 },
      { sku: "SD1100W", quantity: 0 },
      { sku: "TN2000W", quantity: 0 },
      { sku: "TN2300W", quantity: 0 },
      { sku: "VBG1597W", quantity: 0 },
      { sku: "MDRT294FGF01", quantity: 0 },
      { sku: "YL1633S", quantity: 0 },
      { sku: "VBG1098SWB", quantity: 0 },
      { sku: "TN1800W", quantity: 2 },
      { sku: "KRS12DRWI", quantity: 0 },
      { sku: "KRD32WRSI", quantity: 1 },
      { sku: "WM709TL", quantity: 6 },
      { sku: "WM709TLA", quantity: 3 },
      { sku: "WM709TLB", quantity: 0 },
      { sku: "C2400AC", quantity: 4 },
      { sku: "TB50VM", quantity: 0 },
      { sku: "TB60VA", quantity: 0 },
      { sku: "TB60VX", quantity: 0 },
      { sku: "STE1010", quantity: 2 },
      { sku: "DST7030/26", quantity: 0 },
      { sku: "HR1393/01", quantity: 0 },
      { sku: "FC8294/01", quantity: 2 },
      { sku: "DST7011/26", quantity: 4 },
      { sku: "SI7160BL", quantity: 1 },
      { sku: "TS340C", quantity: 0 },
      { sku: "BT3440", quantity: 1 },
      { sku: "BT5420", quantity: 0 },
      { sku: "VC20M2510WB", quantity: 0 },
      { sku: "VNF2500", quantity: 0 },
      { sku: "FG1007", quantity: 2 },
      { sku: "FG762", quantity: 0 },
      { sku: "FG015", quantity: 1 },
      { sku: "LED85HUL", quantity: 0 },
      { sku: "CHW4070S", quantity: 0 },
      { sku: "JT421", quantity: 4 },
      { sku: "JT1423", quantity: 2 },
      { sku: "JT221", quantity: 9 },
      { sku: "JT56B", quantity: 3 },
      { sku: "JT1013", quantity: 1 },
      { sku: "JTHA722", quantity: 0 },
      { sku: "led32G", quantity: 0 },
      { sku: "UA50CU8000UXTW", quantity: 0 },
      { sku: "FC1700-SR", quantity: 0 },
      { sku: "MDRD86FGE01", quantity: 0 },
      { sku: "SCP3701", quantity: 0 },
      { sku: "STE1030", quantity: 0 },
      { sku: "MQ120", quantity: 2 },
      { sku: "VCH2", quantity: 3 },
      { sku: "SE3000", quantity: 6 },
      { sku: "MGK5445", quantity: 0 },
      { sku: "2736", quantity: 4 },
      { sku: "GC300", quantity: 0 },
      { sku: "V32HTX", quantity: 2 },
      { sku: "VC20B", quantity: 3 },
      { sku: "CHW5080B", quantity: 2 },
      { sku: "CHW5080", quantity: 1 },
      { sku: "SB1000SS", quantity: 0 },
      { sku: "GH5EBL", quantity: 0 },
      { sku: "MDC100C01", quantity: 1 },
      { sku: "MDRW150FGG22", quantity: 1 },
      { sku: "MF100W70W", quantity: 0 },
      { sku: "MF200W110WBT", quantity: 0 },
      { sku: "MF200W110WBW", quantity: 1 },
      { sku: "P7FLEX", quantity: 0 },
      { sku: "VCB52A15A0A", quantity: 0 },
      { sku: "NS1213C1", quantity: 2 },
      { sku: "D90D25AL", quantity: 4 },
      { sku: "GH2400", quantity: 0 },
      { sku: "NWM9523S", quantity: 0 },
      { sku: "SMG4382", quantity: 1 },
      { sku: "GWH12AGC-K3", quantity: 0 },
      { sku: "GUD50P1/NHA", quantity: 0 },
      { sku: "MDRU229FSF01", quantity: 3 },
      { sku: "AWA75-8G", quantity: 0 },
      { sku: "GC306028", quantity: 2 },
      { sku: "BRAS430DSE", quantity: 3 },
      { sku: "BRST510SDE", quantity: 1 },
      { sku: "FS1000", quantity: 0 },
      { sku: "BLP150WH", quantity: 1 },
      { sku: "HBM02", quantity: 3 },
      { sku: "OFR11B", quantity: 0 },
      { sku: "FH200W", quantity: 0 },
      { sku: "SHI1100BK", quantity: 2 },
      { sku: "SHM5207SS", quantity: 1 },
      { sku: "MD200H110WB/B", quantity: 0 },
      { sku: "55NANO80T6A", quantity: 3 },
      { sku: "65NANO80T6A", quantity: 0 },
      { sku: "75NANO776RA", quantity: 0 },
      { sku: "FP1000W", quantity: 1 },
      { sku: "FP1000B", quantity: 3 },
      { sku: "FP1000R", quantity: 1 },
      { sku: "GP300X", quantity: 0 },
      { sku: "JT176", quantity: 1 },
      { sku: "MX5200BXL", quantity: 2 },
      { sku: "R25S", quantity: 0 },
      { sku: "NTL1424W", quantity: 0 },
      { sku: "F60GEB1F", quantity: 0 },
      { sku: "AG925BVG-B", quantity: 0 },
      { sku: "T965X", quantity: 0 },
      { sku: "FRIDGE5", quantity: 0 },
      { sku: "0011", quantity: 0 },
      { sku: "SRV9120BK", quantity: 1 },
      { sku: "SVC0741YL", quantity: 1 },
      { sku: "13R", quantity: 0 },
      { sku: "9R", quantity: 0 },
      { sku: "CI905VPIN", quantity: 0 },
      { sku: "SHIRE-90", quantity: 0 },
      { sku: "FGG60XFLAT-FAN", quantity: 1 },
      { sku: "PFI75TNXG", quantity: 0 },
      { sku: "2240-60INOX", quantity: 1 },
      { sku: "GC755VPMC", quantity: 2 },
      { sku: "DW911TB", quantity: 0 },
      { sku: "SHI3100VT", quantity: 5 },
      { sku: "SHP4302RD", quantity: 4 },
      { sku: "SWK1799SS", quantity: 2 },
      { sku: "WIEB19NUK", quantity: 0 },
      { sku: "D11012X02", quantity: 0 },
      { sku: "FDP65", quantity: 1 },
      { sku: "JE290", quantity: 3 },
      { sku: "BRAS420E", quantity: 2 },
      { sku: "SI3050BL", quantity: 2 },
      { sku: "SI5188BK", quantity: 2 },
      { sku: "GS5011", quantity: 1 },
      { sku: "BT5440", quantity: 3 },
      { sku: "FDM307SS", quantity: 3 },
      { sku: "WR5011PSG", quantity: 2 },
      { sku: "DV90BB5245ABS1", quantity: 0 },
      { sku: "WW70T4020CX1AS", quantity: 0 },
      { sku: "WW11B1A046ABFH", quantity: 0 },
      { sku: "50UT80006LB", quantity: 2 },
      { sku: "RZ32M71207F", quantity: 0 },
      { sku: "CD90H", quantity: 3 },
      { sku: "FFB8259SBS", quantity: 0 },
      { sku: "FFTM1181S", quantity: 1 },
      { sku: "FR4083NBG", quantity: 2 },
      { sku: "FRZ112X", quantity: 3 },
      { sku: "WFC3C33PFX", quantity: 1 },
      { sku: "MG5930/15", quantity: 2 },
      { sku: "BHA305/03", quantity: 3 },
      { sku: "BHS378/03", quantity: 3 },
      { sku: "DST5020/30", quantity: 3 },
      { sku: "DST7040/86", quantity: 3 },
      { sku: "GC3929/66", quantity: 3 },
      { sku: "HR7301/90", quantity: 4 },
      { sku: "HR7776/91", quantity: 1 },
      { sku: "HD9350/92", quantity: 2 },
      { sku: "STE1020/46", quantity: 2 },
      { sku: "CD90HA", quantity: 2 },
      { sku: "CB95SC", quantity: 2 },
      { sku: "DW911TBL", quantity: 0 },
      { sku: "65UT80006", quantity: 1 },
      { sku: "YGJ15Q1W", quantity: 1 },
      { sku: "F4R5VGG2E", quantity: 0 },
      { sku: "MSXW09", quantity: 1 },
      { sku: "RT53DG7A60WWIQ", quantity: 3 },
      { sku: "RT53DG7A60S9IQ", quantity: 2 },
      { sku: "335S", quantity: 0 },
      { sku: "MX5200CHXL", quantity: 0 },
      { sku: "MA620032", quantity: 0 },
    ];
    updateProductQuantity({ data });
  };

  return (
    <>
      <div className="relative">
        <Link href={`/edit-product/${id}`}>
          <button
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
            className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
          >
            <Edit />
          </button>
        </Link>
        <EditTooltip showEdit={showEdit} />
      </div>
      <div className="relative">
        <button
          onClick={() => handleDelete(id)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          <Delete />
        </button>
        <DeleteTooltip showDelete={showDelete} />
      </div>
      <div className="relative">
        <Link href={`/edit-product/${id}/reviews`}>
          <button
            onMouseEnter={() => setShowReview(true)}
            onMouseLeave={() => setShowReview(false)}
            className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-blue-500 hover:border-blue-500 hover:text-white"
          >
            <EyeIcon width={15} />
          </button>
        </Link>
        <ReviewTooltip showReview={showReview} />
      </div>
      {/* <div className="relative">
        <button
          onClick={() => handleUpdate()}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          Update
        </button>
      </div> */}
    </>
  );
};
export default EditDeleteBtn;
