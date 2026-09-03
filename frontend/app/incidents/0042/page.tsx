"use client";

import { FormEvent, useState } from "react";

type TerminalEntry = {
  command: string;
  output: string[];
};

export default function Incident0042Page() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [evidence, setEvidence] = useState<string[]>([]);

  const discoverEvidence = (item: string) => {
    setEvidence((current) => {
      if (current.includes(item)) {
        return current;
      }

      return [...current, item];
    });
  };

  const executeCommand = (rawCommand: string): string[] => {
    const input = rawCommand.trim().toLowerCase();

    if (input === "help") {
      return [
        "INCIDENT 0042 COMMAND REFERENCE",
        "",
        "help              Show available commands",
        "user jsmith       Inspect employee account",
        "auth jsmith       Review authentication logs",
        "timeline          Display incident timeline",
        "ip <address>      Investigate a source IP address",
        "endpoint jsmith   Inspect endpoint/device telemetry",
        "mfa jsmith        Analyze MFA challenge activity",
        "geo jsmith        Correlate login geography",
        "evidence          Display collected evidence",
        "clear             Clear terminal",
      ];
    }

    if (input === "user jsmith") {
      discoverEvidence("E-001 — Employee account profile");

      return [
        "USER RECORD — JSMITH",
        "",
        "Name:        Jordan Smith",
        "Department:  Finance",
        "Role:        Senior Financial Analyst",
        "Account:     ACTIVE",
        "MFA:         ENABLED",
        "",
        "[+] EVIDENCE DISCOVERED",
        "E-001 — Employee account profile",
      ];
    }

    if (input === "auth jsmith") {
      discoverEvidence("E-002 — Suspicious authentication sequence");

      return [
        "AUTHENTICATION LOG — JSMITH",
        "",
        "03:14  FAILED_LOGIN",
        "03:15  FAILED_LOGIN",
        "03:17  FAILED_LOGIN",
        "03:18  MFA_DENIED",
        "03:20  MFA_DENIED",
        "03:22  MFA_ACCEPTED",
        "03:22  LOGIN_SUCCESSFUL",
        "",
        "SOURCE IP: 185.234.XXX.XXX",
        "",
        "[!] ANOMALY DETECTED",
        "Multiple MFA denials preceded a successful authentication.",
        "",
        "[+] EVIDENCE DISCOVERED",
        "E-002 — Suspicious authentication sequence",
      ];
    }
    if (input === "ip 185.234.xxx.xxx") {
      discoverEvidence("E-004 — Suspicious external source IP");

      return [
        "IP INTELLIGENCE REPORT",
        "",
        "Address:       185.234.XXX.XXX",
        "Reputation:    SUSPICIOUS",
        "Network Type:  Hosting / VPS",
        "Risk Level:    HIGH",
        "",
        "LOGIN HISTORY CORRELATION",
        "",
        "No previous Jordan Smith authentication",
        "has been observed from this network.",
        "",
        "[!] THREAT INDICATOR",
        "Source network is inconsistent with",
        "the employee's normal authentication history.",
        "",
        "[+] EVIDENCE DISCOVERED",
        "E-004 — Suspicious external source IP",
      ];
    }
    if (input === "timeline") {
      discoverEvidence("E-003 — Authentication timeline");

      return [
        "INCIDENT TIMELINE",
        "",
        "03:14  First failed password attempt",
        "03:15  Second failed password attempt",
        "03:17  Third failed password attempt",
        "03:18  MFA request denied",
        "03:20  MFA request denied",
        "03:22  MFA request accepted",
        "03:22  Successful login recorded",
        "",
        "[+] EVIDENCE DISCOVERED",
        "E-003 — Authentication timeline",
      ];
    }

    

if (input === "endpoint jsmith") {
  discoverEvidence("E-005 — Unknown authentication device");

  return [
    "ENDPOINT TELEMETRY — JSMITH",
    "",
    "Assigned Device: FIN-WS-042",
    "Operating System: Windows 11",
    "EDR Status: ONLINE",
    "Last Seen: 03:11",
    "",
    "AUTHENTICATION DEVICE CORRELATION",
    "",
    "Successful login at 03:22 did NOT originate",
    "from Jordan Smith's assigned workstation.",
    "",
    "Observed Device:",
    "Browser:    Chrome",
    "OS:         Linux",
    "Device ID:  UNKNOWN",
    "",
    "[!] DEVICE MISMATCH",
    "Authentication originated from an",
    "unrecognized endpoint.",
    "",
    "[+] EVIDENCE DISCOVERED",
    "E-005 — Unknown authentication device",
  ];
}


if (input === "mfa jsmith") {
  discoverEvidence("E-006 — MFA fatigue pattern");

  return [
    "MFA CHALLENGE ANALYSIS — JSMITH",
    "",
    "03:18  PUSH DENIED",
    "03:20  PUSH DENIED",
    "03:22  PUSH ACCEPTED",
    "",
    "Challenge Pattern: REPEATED",
    "Time Window:        4 minutes",
    "Final Result:       ACCEPTED",
    "",
    "[!] MFA FATIGUE INDICATOR",
    "Multiple unsolicited MFA challenges were",
    "sent before a final request was accepted.",
    "",
    "This pattern is consistent with MFA fatigue",
    "or push-bombing activity.",
    "",
    "[+] EVIDENCE DISCOVERED",
    "E-006 — MFA fatigue pattern",
  ];
}

if (input === "geo jsmith") {
  discoverEvidence("E-007 — Geographic login anomaly");

  return [
    "LOGIN GEOGRAPHY CORRELATION — JSMITH",
    "",
    "Normal Login Region:",
    "  Arlington, Virginia, USA",
    "",
    "Last Known Legitimate Activity:",
    "  02:58 — Arlington, Virginia, USA",
    "",
    "Suspicious Authentication:",
    "  03:22 — Amsterdam, Netherlands",
    "",
    "Elapsed Time: 24 minutes",
    "",
    "[!] IMPOSSIBLE TRAVEL INDICATOR",
    "The geographic distance between the two",
    "authentication events is not physically",
    "possible within the observed time window.",
    "",
    "[+] EVIDENCE DISCOVERED",
    "E-007 — Geographic login anomaly",
  ];
}

if (input === "evidence") {
      if (evidence.length === 0) {
        return [
          "EVIDENCE LOCKER",
          "",
          "No evidence has been collected.",
          "Investigate the case to discover evidence.",
        ];
      }

      return [
        "EVIDENCE LOCKER",
        "",
        ...evidence,
        "",
        `${evidence.length} evidence item(s) collected.`,
      ];
    }

    if (input === "") {
      return [];
    }

    return [
      `Command not recognized: ${rawCommand}`,
      'Type "help" to view available commands.',
    ];
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

    const output = executeCommand(trimmedCommand);

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
              HIGH SEVERITY
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              Suspicious Employee Login
            </h2>

            <p className="text-zinc-400 mt-3 max-w-3xl">
              Investigate the authentication event and determine whether
              Jordan Smith&apos;s account has been compromised.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">EMPLOYEE</p>
              <p className="mt-2">Jordan Smith</p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">USERNAME</p>
              <p className="mt-2">jsmith</p>
            </div>

            <div className="border border-zinc-800 p-5">
              <p className="text-xs text-zinc-600">DEPARTMENT</p>
              <p className="mt-2">Finance</p>
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
                  Determine whether the employee account has been
                  compromised and identify the attack method.
                </p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  EVIDENCE DISCOVERED
                </p>

                <p className="text-3xl mt-3">
                  {evidence.length} / 8
                </p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  CASE STATUS
                </p>

                <p className="text-yellow-500 mt-3">
                  INVESTIGATING
                </p>
              </div>

              <div className="border border-zinc-800 p-6">
                <p className="text-xs text-zinc-600 tracking-widest">
                  ANALYST NOTE
                </p>

                <p className="mt-4 text-sm text-zinc-400 leading-6">
                  Start with the account and authentication activity.
                  Correlate evidence before reaching a conclusion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
