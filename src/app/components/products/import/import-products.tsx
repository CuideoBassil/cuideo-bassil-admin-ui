"use client";
import { useImportProductsExcelMutation } from "@/redux/product/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import Cookies from "js-cookie";
import { useState } from "react";

type RowError = { row: number | null; sku?: string; name?: string; messages: string[] };
type SkippedRow = { row: number; sku: string; reason: string };
type LookupResult = { created: number; skipped: number; errors: RowError[] };
type ProductsResult = {
  totalRows: number;
  validCount: number;
  inserted: number;
  skipped: SkippedRow[];
  errors: RowError[];
};
type ImportResult = {
  mode: "validate" | "commit";
  categories: LookupResult;
  brands: LookupResult;
  productTypes: LookupResult;
  products: ProductsResult;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ImportProducts = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [importProductsExcel, { isLoading }] = useImportProductsExcelMutation();

  const getToken = (): string | undefined => {
    try {
      const admin = Cookies.get("admin");
      return admin ? JSON.parse(admin)?.accessToken : undefined;
    } catch {
      return undefined;
    }
  };

  // Download the template (lookup sheets pre-filled from the DB).
  const handleDownloadTemplate = async () => {
    try {
      setDownloading(true);
      const res = await fetch(`${baseUrl}/api/product/import-template`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cuideo-product-import.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      notifySuccess("Template downloaded");
    } catch (err: any) {
      notifyError(err?.message || "Failed to download template");
    } finally {
      setDownloading(false);
    }
  };

  const runImport = async (mode: "validate" | "commit") => {
    if (!file) return notifyError("Please choose an Excel file first");
    try {
      const res = await importProductsExcel({ file, mode }).unwrap();
      setResult(res.data as ImportResult);
      notifySuccess(res.message || "Done");
    } catch (err: any) {
      notifyError(err?.data?.message || "Import failed");
    }
  };

  const lookupLine = (label: string, r?: LookupResult) =>
    r ? (
      <li>
        <span className="font-medium">{label}:</span> {r.created} created, {r.skipped} already existed (skipped)
        {r.errors.length > 0 && (
          <span className="text-red ml-1">({r.errors.length} errors)</span>
        )}
      </li>
    ) : null;

  const p = result?.products;
  const allLookupErrors: RowError[] = result
    ? [
        ...result.categories.errors.map((e) => ({ ...e })),
        ...result.brands.errors.map((e) => ({ ...e })),
        ...result.productTypes.errors.map((e) => ({ ...e })),
      ]
    : [];

  return (
    <div className="bg-white px-8 py-8 rounded-md">
      <h3 className="text-lg font-medium mb-2">Batch import from Excel</h3>
      <p className="text-tiny text-gray-500 mb-6 leading-5">
        Download the template (the Categories, Brands and Product Types sheets are
        pre-filled with what already exists). Fill the Products sheet, then run a
        validation dry-run before importing. Nothing is ever deleted — valid rows
        are added, invalid rows are reported below.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={handleDownloadTemplate}
          disabled={downloading}
          type="button"
          className="tp-btn px-5 py-2 disabled:opacity-50"
        >
          {downloading ? "Preparing…" : "Download Template"}
        </button>

        <label className="text-tiny inline-block py-2 px-4 rounded-md border border-gray6 cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition">
          {file ? file.name : "Choose Excel file"}
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setResult(null);
            }}
          />
        </label>

        <button
          onClick={() => runImport("validate")}
          disabled={isLoading || !file}
          type="button"
          className="px-5 py-2 rounded-md border border-theme text-theme disabled:opacity-50"
        >
          Validate (dry run)
        </button>

        <button
          onClick={() => runImport("commit")}
          disabled={isLoading || !file}
          type="button"
          className="tp-btn px-5 py-2 disabled:opacity-50"
        >
          {isLoading ? "Working…" : "Import"}
        </button>
      </div>

      {result && (
        <div className="border-t pt-6">
          <div
            className={`mb-4 px-4 py-3 rounded-md text-sm ${
              result.mode === "validate"
                ? "bg-blue-50 text-blue-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {result.mode === "validate"
              ? "Dry run — nothing was saved."
              : "Import committed."}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-2">Lookup tables</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {lookupLine("Categories", result.categories)}
                {lookupLine("Brands", result.brands)}
                {lookupLine("Product Types", result.productTypes)}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Products</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Rows read: {p?.totalRows ?? 0}</li>
                <li>
                  {result.mode === "commit" ? "Inserted" : "Would insert"}:{" "}
                  <span className="font-medium text-green-700">
                    {result.mode === "commit" ? p?.inserted ?? 0 : p?.validCount ?? 0}
                  </span>
                </li>
                <li>
                  Skipped: <span className="font-medium">{p?.skipped.length ?? 0}</span>
                </li>
                <li>
                  Errors: <span className="font-medium text-red">{p?.errors.length ?? 0}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Product errors */}
          {p && p.errors.length > 0 && (
            <ResultTable
              title="Product errors"
              rows={p.errors.map((e) => ({
                row: e.row,
                ref: e.sku || "",
                detail: e.messages.join("; "),
              }))}
              refLabel="SKU"
              tone="error"
            />
          )}

          {/* Skipped */}
          {p && p.skipped.length > 0 && (
            <ResultTable
              title="Skipped products"
              rows={p.skipped.map((s) => ({ row: s.row, ref: s.sku, detail: s.reason }))}
              refLabel="SKU"
              tone="warn"
            />
          )}

          {/* Lookup errors */}
          {allLookupErrors.length > 0 && (
            <ResultTable
              title="Category / Brand / Type errors"
              rows={allLookupErrors.map((e) => ({
                row: e.row,
                ref: e.name || e.sku || "",
                detail: e.messages.join("; "),
              }))}
              refLabel="Name"
              tone="error"
            />
          )}
        </div>
      )}
    </div>
  );
};

const ResultTable = ({
  title,
  rows,
  refLabel,
  tone,
}: {
  title: string;
  rows: { row: number | null; ref: string; detail: string }[];
  refLabel: string;
  tone: "error" | "warn";
}) => (
  <div className="mb-6">
    <h4 className={`font-medium mb-2 ${tone === "error" ? "text-red" : "text-yellow-600"}`}>
      {title} ({rows.length})
    </h4>
    <div className="overflow-x-auto border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="px-3 py-2 w-20">Row</th>
            <th className="px-3 py-2 w-40">{refLabel}</th>
            <th className="px-3 py-2">Detail</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="px-3 py-2">{r.row ?? "—"}</td>
              <td className="px-3 py-2 font-mono">{r.ref}</td>
              <td className="px-3 py-2">{r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ImportProducts;
