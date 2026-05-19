"use client";

import { useState } from "react";
import {
  Upload,
  BrainCircuit,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [rawText, setRawText] = useState("");
  const [error, setError] = useState("");

  async function handleFile(selectedFile) {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a PDF.");
      return;
    }

    setError("");
    setLoading(true);
    setFile(selectedFile);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed");
      }

      setSummary(data.summary);
      setRawText(data.text);
    } catch (err) {
      console.error(err);

      setError("Failed to parse PDF.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="flex items-center gap-4">
          <BrainCircuit
            className="text-blue-400"
            size={50}
          />

          <div>
            <h1 className="text-5xl font-black">
              Broker AI Credit Assessor
            </h1>

            <p className="mt-2 text-lg text-slate-400">
              AI-powered illion analyser
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex items-center gap-3">
            <Upload
              className="text-blue-400"
              size={32}
            />

            <div>
              <h2 className="text-2xl font-bold">
                Upload Illion PDF
              </h2>

              <p className="text-slate-400">
                Drag & drop or select your PDF
              </p>
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);

              const droppedFile =
                e.dataTransfer.files?.[0];

              handleFile(droppedFile);
            }}
            className={`mt-8 rounded-3xl border-2 border-dashed p-10 text-center transition ${
              dragging
                ? "border-blue-500 bg-blue-950"
                : "border-slate-700 bg-slate-950"
            }`}
          >

            <FileText
              className="mx-auto text-slate-500"
              size={70}
            />

            <div className="mt-5 text-2xl font-black">
              Drag PDF Here
            </div>

            <div className="mt-2 text-slate-500">
              or choose file below
            </div>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) =>
                handleFile(e.target.files?.[0])
              }
              className="mx-auto mt-8 block max-w-md cursor-pointer rounded-xl border border-slate-700 bg-slate-900 p-4 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-bold file:text-white"
            />

          </div>

          {loading && (
            <div className="mt-8 rounded-2xl border border-blue-800 bg-blue-950 p-5 text-blue-200">
              Parsing PDF and extracting conduct...
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-2xl border border-red-800 bg-red-950 p-5 text-red-200">
              {error}
            </div>
          )}

          {file && !loading && (
            <div className="mt-8 rounded-2xl border border-emerald-800 bg-emerald-950 p-5 text-emerald-200">

              <div className="flex items-center gap-3">
                <CheckCircle2 size={28} />

                <div>
                  <div className="text-xl font-black">
                    PDF Uploaded
                  </div>

                  <div className="mt-1">
                    {file.name}
                  </div>
                </div>
              </div>

            </div>
          )}

        </section>

        {summary && (
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-3xl font-black">
              Extracted Summary
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">

              {Object.entries(summary).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                  >
                    <div className="text-sm capitalize text-slate-500">
                      {key.replace(
                        /([A-Z])/g,
                        " $1"
                      )}
                    </div>

                    <div className="mt-2 break-words text-2xl font-black">
                      {value}
                    </div>
                  </div>
                )
              )}

            </div>

          </section>
        )}

        {rawText && (
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-2xl font-bold">
              Raw Extract Preview
            </h2>

            <pre className="mt-4 max-h-[600px] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-xs text-slate-300">
              {rawText.slice(0, 12000)}
            </pre>

          </section>
        )}

      </div>
    </main>
  );
}