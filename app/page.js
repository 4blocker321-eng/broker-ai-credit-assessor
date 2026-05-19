"use client";

import { useState } from "react";
import { Upload, BrainCircuit, FileText, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(selectedFile) {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center gap-4">
          <BrainCircuit className="text-blue-400" size={50} />

          <div>
            <h1 className="text-5xl font-black">
              Broker AI Credit Assessor
            </h1>

            <p className="mt-2 text-lg text-slate-400">
              PDF upload test version
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center gap-3">
            <Upload className="text-blue-400" size={32} />

            <div>
              <h2 className="text-2xl font-bold">
                Upload Illion PDF
              </h2>

              <p className="text-slate-400">
                Click the button or drag your PDF into the box.
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
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`mt-8 rounded-3xl border-2 border-dashed p-10 text-center ${
              dragging
                ? "border-blue-500 bg-blue-950"
                : "border-slate-700 bg-slate-950"
            }`}
          >
            <FileText className="mx-auto text-slate-500" size={70} />

            <div className="mt-5 text-2xl font-black">
              Drag PDF Here
            </div>

            <div className="mt-2 text-slate-500">
              or use the button below
            </div>

            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="mx-auto mt-8 block max-w-md cursor-pointer rounded-xl border border-slate-700 bg-slate-900 p-4 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-bold file:text-white"
            />
          </div>

          {file && (
            <div className="mt-8 rounded-3xl border border-emerald-800 bg-emerald-950 p-6 text-emerald-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={28} />

                <div>
                  <div className="text-xl font-black">
                    PDF uploaded successfully
                  </div>

                  <div className="mt-1">
                    File name: {file.name}
                  </div>

                  <div>
                    File size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}