"use client";

import { FormEvent, useState } from "react";
import { incident0042 } from "@/data/incidents/0042";
import AttackTimeline from "@/components/incidents/AttackTimeline";
import EvidenceFindings from "@/components/incidents/EvidenceFindings";
import RecommendedRemediation from "@/components/incidents/RecommendedRemediation";
import IncidentDetails from "@/components/incidents/IncidentDetails";
import { executeIncident0042Command } from "@/lib/incidents/executeIncident0042Command";
type TerminalEntry = {
  command: string;
  output: string[];
};

export default function Incident0042Page() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [evidence, setEvidence] = useState<string[]>([]);
  const [caseStatus, setCaseStatus] = useState("INVESTIGATING");
  const score = evidence.length * 100;
  const [reportReady, setReportReady] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const discoverEvidence = (item: string) => {
    setEvidence((current) => {
      if (current.includes(item)) {
        return current;
      }

 
      return [...current, item];
    });
  };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedCommand = command.trim();

    if (!trimmedCommand) {
      return;
    }

    if (trimmedCommand.toLowerCase() === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }

    const output = executeIncident0042Command(trimmedCommand, {
  evidence,
  score,
  discoverEvidence,
  setCaseStatus,
  setReportReady,
});

    setHistory((current) => [
      ...current,
      {
        command: trimmedCommand,
        output,
      },
    ]);

    setCommand("");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-[0.2em]">
            INCIDENT 0042
          </h1>

          <p className="text-xs text-zinc-500 mt-1 tracking-widest">
            ACTIVE INVESTIGATION
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-600">CASE</p>
          <p className="text-red-500">0042-001</p>
        </div>
      </header>

      <section className="p-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-xs text-red-500 tracking-[0.3em]">
              {incident0042.severity.toUpperCase()} SEVERITY
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              {incident0042.title}    
            </h2>

            <p className="text-zinc-400 mt-3 max-w-3xl">
              Investigate the authentication event and determine whether
              Jordan Smith&apos;s account has been compromised.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">EMPLOYEE</p>
              <p className="mt-2">{incident0042.employee.name}</p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">USERNAME</p>
              <p className="mt-2">{incident0042.employee.username}</p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">DEPARTMENT</p>
              <p className="mt-2">{incident0042.employee.department}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 border border-zinc-800 bg-zinc-950">
              <div className="border-b border-zinc-800 px-6 py-4">
                <p className="text-xs text-zinc-500 tracking-widest">
                  INVESTIGATION TERMINAL
                </p>
              </div>

              <div className="p-6 font-mono min-h-[520px] max-h-[650px] overflow-y-auto">
                <p className="text-green-500">
                  INCIDENT 0042 ANALYST TERMINAL
                </p>

                <p className="text-zinc-500 mt-2">
                  Type &quot;help&quot; to view available commands.
                </p>

                <div className="mt-6 space-y-6">
                  {history.map((entry, index) => (
                    <div key={index}>
                      <div>
                        <span className="text-green-500">
                          analyst@incident0042:~$
                        </span>

                        <span className="text-white ml-2">
                          {entry.command}
                        </span>
                      </div>

                      <div className="mt-2 text-zinc-300">
                        {entry.output.map((line, lineIndex) => (
                          <div
                            key={lineIndex}
                            className={
                              line.startsWith("[!]")
                                ? "text-yellow-400"
                                : line.startsWith("[+]")
                                  ? "text-green-400"
                                  : ""
                            }
                          >
                            {line || "\u00A0"}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex items-center"
                >
                  <span className="text-green-500 whitespace-nowrap">
                    analyst@incident0042:~$
                  </span>

                  <input
                    value={command}
                    onChange={(event) => setCommand(event.target.value)}
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Investigation terminal command"
                    className="ml-2 flex-1 bg-transparent text-white outline-none caret-green-500"
                  />
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  CASE OBJECTIVE
                </p>

                <p className="mt-4 text-sm text-zinc-300 leading-6">
                  {incident0042.objective}
                </p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  EVIDENCE DISCOVERED
                </p>

                <p className="text-3xl mt-3">
                  {evidence.length} / {incident0042.evidence.length}
                </p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  ANALYST SCORE
                </p>

                <p className="text-3xl mt-3">
                       {score} / {incident0042.xpReward}
                 </p>
               </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  CASE STATUS
                </p>

                <p className="text-yellow-500 mt-3">
                  {caseStatus}
                </p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  ANALYST NOTE
                </p>

                {reportReady ? (
              <div className="mt-4">
               <p className="text-sm text-green-500">
                 INCIDENT RESPONSE REPORT READY
               </p>
              <p className="mt-2 text-sm text-zinc-400 leading-6">
               Investigation complete. Final findings and remediation
               recommendations are ready for review.
                </p>

               <button
               onClick={() => setReportOpen(true)}                 
               className="mt-4 border border-green-500 px-4 py-2 text-xs text-green-500 tracking-widest hover:bg-green-500 hover:text-black"
                >
                 VIEW INCIDENT REPORT
                </button>

                </div>
                 ) : (
              <p className="mt-4 text-sm text-zinc-400 leading-6">
               Start with the account and authentication activity.
               Correlate evidence before reaching a conclusion.
              </p>
             )}

              </div>
            </div>
          </div>
        </div>
      </section>
             {reportOpen && (
             <div className="fixed inset-0 z-50 bg-black/90 overflow-y-auto p-8 flex items-start justify-center">
             <div className="max-w-4xl mx-auto border border-zinc-700 bg-zinc-950 p-8">
             <div className="flex justify-between items-center">
        <p className="text-green-500 text-sm tracking-widest">
          INCIDENT RESPONSE REPORT
        </p>

        <button
          onClick={() => setReportOpen(false)}
          className="border border-zinc-700 px-3 py-1 text-xs text-zinc-400"
        >
          CLOSE
        </button>
      </div>

      <h2 className="text-3xl mt-6">
        Incident 0042
      </h2>

      <p className="text-zinc-400 mt-2">
        Account Compromise — MFA Fatigue / Push Bombing
      </p>

<div className="mt-8 border-t border-zinc-800 pt-6">
  <p className="text-xs text-zinc-600 tracking-widest">
    EXECUTIVE SUMMARY
  </p>

  <p className="mt-3 text-sm text-zinc-300 leading-6">
    Investigation confirmed that the employee account belonging to
    Jordan Smith (jsmith) was compromised through an MFA fatigue attack.
    The attacker used valid credentials, generated repeated MFA push
    requests, and gained unauthorized access after a challenge was
    accepted at 03:22.
  </p>
</div>

<IncidentDetails
  employee={incident0042.employee}
  incidentType={incident0042.incidentType}
  attackMethod={incident0042.attackMethod}
  authenticationTime={incident0042.authenticationTime}
  caseStatus={caseStatus}
/>

<EvidenceFindings evidence={evidence} />

<AttackTimeline timeline={incident0042.timeline} />

<RecommendedRemediation remediation={incident0042.remediation} />

</div>
    </div>
)}    
</main>
  );
}
