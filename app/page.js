"use client";

import { useState } from "react";
import { Upload, BrainCircuit, FileText, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  async function processFile(file) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    setFileName(file.name);
    setRawText("");
    setSummary(null);

    try {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;

      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        text += "\n" + pageText;
      }

      setRawText(text);
      setSummary(analyseIllionText(text));
    } catch (err) {
      console.error(err);
      setError("Failed to read PDF. It may be image-based and need OCR.");
    }

    setLoading(false);
  }

  function moneyMatch(text, label) {
    const regex = new RegExp(`${label}[^$-]*(-?\\$?[0-9,]+\\.\\d{2})`, "i");
    const match = text.match(regex);
    return match ? match[1] : "Not found";
  }

  function valueMatch(text, label) {
    const regex = new RegExp(`${label}[^0-9]*(\\d+)`, "i");
    const match = text.match(regex);
    return match ? match[1] : "0";
  }

  function analyseIllionText(text) {
    return {
      accountHolder:
        text.match(/Account Holder:\s*([A-Z\s]+)/i)?.[1]?.trim() ||
        "Not found",
      institution:
        text.match(/Institution:\s*([A-Za-z\s]+)/i)?.[1]?.trim() ||
        "Not found",
      totalCredits: moneyMatch(text, "Total Credits"),
      totalDebits: moneyMatch(text, "Total Debits"),
      currentBalance: moneyMatch(text, "Current Balance"),
      dishonours: valueMatch(text, "Number of Dishonours"),
      gambling: moneyMatch(text, "Gambling Expenditure - Monthly"),
      groceries: moneyMatch(text, "Groceries - Monthly"),
      rent: moneyMatch(text, "Rent - Monthly"),
      transport: moneyMatch(text, "Vehicles and Transport - Monthly"),
      subscriptions: moneyMatch(text, "Subscription TV - Monthly"),
      utilities: moneyMatch(text, "Utilities - Monthly"),
    };
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-4">
          <BrainCircuit className="text-blue-400" size={50} />
          <div>
            <h1 className="text-5xl font-black">Broker AI Credit Assessor</h1>
            <p className="mt-2 text-lg text-slate-400">
              Upload and analyse illion statements
            </p>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <div className="flex items-center gap-3">
              <Upload className="text-blue-400" size={32} />
              <div>
                <h2 className="text-2xl font-bold">Upload Illion PDF</h2>
                <p className="text-slate-400">
                  Use the button below to select your PDF
                </p>
              </div>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                processFile(file);
              }}
              className="mt-8 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-700 py-16"
            >
              <FileText size={60} className="text-slate-500" />

              <div className="mt-5 text-2xl font-bold">
                Select or drag PDF here
              </div>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => processFile(e.target.files?.[0])}
                className="mt-8 block w-full max-w-md cursor-pointer rounded-xl border border-slate-700 bg-slate-950 p-4 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-bold file:text-white"
              />

              {fileName && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-950 px-4 py-2 text-emerald-300">
                  <CheckCircle2 size={18} />
                  {fileName}
                </div>
              )}
            </div>

            {loading && (
              <div className="mt-6 rounded-2xl border border-blue-800 bg-blue-950 p-5 text-blue-200">
                Reading PDF and extracting data...
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-800 bg-red-950 p-5 text-red-200">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-emerald-400" size={30} />
              <div>
                <h2 className="text-2xl font-bold">AI Conduct Notes</h2>
                <p className="text-slate-400">Initial assessment</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl bg-slate-950 p-4">
                Detects dishonours and gambling.
              </div>
              <div className="rounded-2xl bg-slate-950 p-4">
                Extracts core illion summary values.
              </div>
              <div className="rounded-2xl bg-slate-950 p-4">
                Next upgrade: recurring transaction grouping.
              </div>
              <div className="rounded-2xl bg-slate-950 p-4">
                Next upgrade: lender policy AI matching.
              </div>
            </div>
          </div>
        </section>

        {summary && (
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-3xl font-black">Extracted Illion Summary</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {Object.entries(summary).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div className="text-sm capitalize text-slate-500">
                    {key.replace(/([A-Z])/g, " $1")}
                  </div>
                  <div className="mt-2 break-words text-2xl font-black">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {rawText && (
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Raw Extract Preview</h2>

            <pre className="mt-4 max-h-[600px] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-xs text-slate-300">
              {rawText.slice(0, 12000)}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}