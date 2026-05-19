"use client";

import { useState } from "react";
import {
  Upload,
  BrainCircuit,
  DollarSign,
  Building2,
  User,
  ClipboardList,
  FileText,
  MessageSquareText,
  Settings,
  Send,
  Download,
  Moon,
  Sun,
} from "lucide-react";

export default function Home() {
  const [loanType, setLoanType] = useState("consumer");
  const [activeTab, setActiveTab] = useState("assessment");
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState("blue");

  const themeColour =
    theme === "emerald"
      ? "emerald"
      : theme === "purple"
      ? "violet"
      : theme === "graphite"
      ? "zinc"
      : "blue";

  const accent =
    theme === "emerald"
      ? "bg-emerald-600 hover:bg-emerald-700"
      : theme === "purple"
      ? "bg-violet-600 hover:bg-violet-700"
      : theme === "graphite"
      ? "bg-zinc-700 hover:bg-zinc-800"
      : "bg-blue-600 hover:bg-blue-700";

  const pageBg = darkMode
    ? "bg-slate-950 text-white"
    : "bg-slate-100 text-slate-950";

  const cardBg = darkMode
    ? "bg-slate-900 border-slate-800"
    : "bg-white border-slate-200";

  const innerCardBg = darkMode
    ? "bg-slate-950 border-slate-800"
    : "bg-slate-50 border-slate-200";

  const muted = darkMode ? "text-slate-400" : "text-slate-600";

  const tabs = [
    { id: "assessment", label: "Assessment", icon: BrainCircuit },
    { id: "applications", label: "Applications", icon: ClipboardList },
    { id: "policies", label: "Policies", icon: FileText },
    { id: "chat", label: "Chat with AI", icon: MessageSquareText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <main className={`min-h-screen ${pageBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-5xl font-black">
              Broker AI Credit Assessor
            </h1>

            <p className={`mt-3 text-lg ${muted}`}>
              AI-powered serviceability, conduct analysis and lender matching
            </p>
          </div>

          <button className={`${accent} text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2`}>
            <Download size={18} />
            Export AI Report
          </button>
        </header>

        <nav className={`mt-8 ${cardBg} border rounded-3xl p-2 flex flex-wrap gap-2`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 transition ${
                  selected
                    ? `${accent} text-white`
                    : darkMode
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "assessment" && (
          <section className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 ${cardBg} border rounded-3xl p-8`}>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <BrainCircuit className={`text-${themeColour}-400`} size={30} />

                  <div>
                    <h2 className="text-2xl font-bold">
                      AI Statement Assessment
                    </h2>

                    <p className={muted}>
                      Upload illion bank statements for automated assessment
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 ${innerCardBg} border rounded-2xl p-2`}>
                  <button
                    onClick={() => setLoanType("consumer")}
                    className={`px-5 py-3 rounded-xl font-semibold ${
                      loanType === "consumer" ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      Consumer
                    </div>
                  </button>

                  <button
                    onClick={() => setLoanType("commercial")}
                    className={`px-5 py-3 rounded-xl font-semibold ${
                      loanType === "commercial" ? "bg-emerald-600 text-white" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 size={18} />
                      Commercial
                    </div>
                  </button>
                </div>
              </div>

              <button className={`mt-8 w-full border-2 border-dashed ${darkMode ? "border-slate-700 hover:border-blue-500" : "border-slate-300 hover:border-blue-500"} transition rounded-3xl py-20 flex flex-col items-center justify-center`}>
                <Upload size={55} className={muted} />

                <div className="mt-4 text-xl font-bold">
                  Upload illion statement
                </div>

                <div className={`${muted} mt-2`}>
                  PDF, CSV or Excel
                </div>
              </button>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {["OneScore", "Commscore", "Proposed Repayment"].map((label) => (
                  <div key={label} className={`${innerCardBg} border rounded-2xl p-5`}>
                    <div className={`${muted} text-sm`}>
                      {label}
                    </div>

                    <input
                      placeholder={label === "OneScore" ? "540" : label === "Commscore" ? "341" : "$650"}
                      className={`mt-3 ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-950"} border rounded-xl px-4 py-3 w-full`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <DecisionPanel cardBg={cardBg} muted={muted} />
          </section>
        )}

        {activeTab === "applications" && (
          <section className={`mt-8 ${cardBg} border rounded-3xl p-8`}>
            <h2 className="text-3xl font-black">Applications</h2>
            <p className={`mt-2 ${muted}`}>
              Name applications, record lender outcomes, and teach the AI from approvals and declines.
            </p>

            <div className="grid lg:grid-cols-3 gap-4 mt-8">
              {[
                ["Sample Applicant - Clean Conduct", "Azora", "Approved"],
                ["Transfer-heavy Applicant", "Plenti", "Declined"],
                ["Low Score Applicant", "Finance One", "Pending"],
              ].map(([name, lender, status]) => (
                <div key={name} className={`${innerCardBg} border rounded-2xl p-5`}>
                  <div className="font-bold text-lg">{name}</div>
                  <div className={`mt-1 text-sm ${muted}`}>{lender}</div>
                  <div className="mt-4 flex gap-2">
                    <button className="bg-emerald-600 text-white px-3 py-2 rounded-xl text-sm font-bold">Approved</button>
                    <button className="bg-red-600 text-white px-3 py-2 rounded-xl text-sm font-bold">Declined</button>
                  </div>
                  <textarea
                    placeholder="Type assessor/bank reasoning..."
                    className={`mt-4 w-full min-h-24 rounded-xl p-3 border ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-950"}`}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "policies" && (
          <section className="mt-8 grid lg:grid-cols-2 gap-6">
            <PolicyPanel
              title="Consumer Policies"
              policies={[
                "Azora",
                "Plenti",
                "Wisr",
                "SocietyOne",
                "Finance One",
                "Money3",
                "MONEYME",
                "Pepper",
                "Liberty",
                "Allied",
              ]}
              cardBg={cardBg}
              innerCardBg={innerCardBg}
              muted={muted}
            />

            <PolicyPanel
              title="Commercial / Chattel Policies"
              policies={[
                "Finance One Commercial",
                "Liberty Commercial",
                "Plenti Commercial",
                "Allied Commercial",
                "Angle Finance",
                "Autopay",
                "Azora Commercial",
                "Dynamoney",
              ]}
              cardBg={cardBg}
              innerCardBg={innerCardBg}
              muted={muted}
            />
          </section>
        )}

        {activeTab === "chat" && (
          <section className={`mt-8 ${cardBg} border rounded-3xl p-8`}>
            <h2 className="text-3xl font-black">Chat with AI Credit Assessor</h2>
            <p className={`mt-2 ${muted}`}>
              Ask which lender fits best, why a file may decline, or how to write the lender submission notes.
            </p>

            <div className={`${innerCardBg} border rounded-3xl p-5 mt-8 min-h-80`}>
              <div className="bg-blue-600 text-white rounded-2xl p-4 max-w-2xl">
                Ask me about policy fit, conduct risk, serviceability or lender positioning.
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <input
                placeholder="Ask: Which lender suits a 540 score, renter, 2 dishonours and account clearing?"
                className={`flex-1 rounded-xl px-4 py-4 border ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-950"}`}
              />

              <button className={`${accent} text-white rounded-xl px-5 py-4 font-bold flex items-center gap-2`}>
                <Send size={18} />
                Send
              </button>
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section className={`mt-8 ${cardBg} border rounded-3xl p-8`}>
            <h2 className="text-3xl font-black">Settings</h2>
            <p className={`mt-2 ${muted}`}>
              Control themes, light/dark mode and AI communication style.
            </p>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <div className={`${innerCardBg} border rounded-2xl p-6`}>
                <h3 className="text-xl font-bold">Colour Theme</h3>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  {["blue", "emerald", "purple", "graphite"].map((colour) => (
                    <button
                      key={colour}
                      onClick={() => setTheme(colour)}
                      className={`rounded-xl px-4 py-3 font-bold capitalize ${
                        theme === colour ? accent + " text-white" : darkMode ? "bg-slate-800" : "bg-white border"
                      }`}
                    >
                      {colour}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`${innerCardBg} border rounded-2xl p-6`}>
                <h3 className="text-xl font-bold">Appearance</h3>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button
                    onClick={() => setDarkMode(false)}
                    className={`rounded-xl px-4 py-3 font-bold flex items-center justify-center gap-2 ${
                      !darkMode ? accent + " text-white" : darkMode ? "bg-slate-800" : "bg-white border"
                    }`}
                  >
                    <Sun size={18} />
                    Light
                  </button>

                  <button
                    onClick={() => setDarkMode(true)}
                    className={`rounded-xl px-4 py-3 font-bold flex items-center justify-center gap-2 ${
                      darkMode ? accent + " text-white" : "bg-white border"
                    }`}
                  >
                    <Moon size={18} />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function DecisionPanel({ cardBg, muted }) {
  return (
    <div className={`${cardBg} border rounded-3xl p-8`}>
      <div className="flex items-center gap-3">
        <DollarSign className="text-emerald-400" size={28} />

        <div>
          <h2 className="text-2xl font-bold">AI Decision</h2>
          <p className={muted}>Live lender-fit analysis</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <LenderCard name="Azora" score="94%" label="Best Fit" colour="emerald" />
        <LenderCard name="Finance One" score="88%" label="Strong fallback" colour="slate" />
        <LenderCard name="Money3" score="77%" label="Possible" colour="slate" />
      </div>
    </div>
  );
}

function LenderCard({ name, score, label, colour }) {
  const cls =
    colour === "emerald"
      ? "bg-emerald-950 border-emerald-800 text-emerald-100"
      : "bg-slate-950 border-slate-800 text-slate-200";

  return (
    <div className={`${cls} border rounded-2xl p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-bold text-lg">{name}</div>
          <div className="text-sm mt-1 opacity-80">{label}</div>
        </div>

        <div className="text-3xl font-black">{score}</div>
      </div>

      <p className="mt-4 text-sm opacity-80">
        AI recommends based on conduct, score, policy tolerance and previous outcome history.
      </p>
    </div>
  );
}

function PolicyPanel({ title, policies, cardBg, innerCardBg, muted }) {
  return (
    <div className={`${cardBg} border rounded-3xl p-8`}>
      <h2 className="text-3xl font-black">{title}</h2>
      <p className={`mt-2 ${muted}`}>
        Current policy library with download and replacement controls.
      </p>

      <div className="mt-6 space-y-3">
        {policies.map((policy) => (
          <div key={policy} className={`${innerCardBg} border rounded-2xl p-4 flex items-center justify-between gap-4`}>
            <div>
              <div className="font-bold">{policy}</div>
              <div className={`text-sm ${muted}`}>Policy loaded · AI readable</div>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-2 rounded-xl bg-slate-700 text-white text-sm font-bold">
                Download
              </button>

              <button className="px-3 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold">
                Switch Out
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}