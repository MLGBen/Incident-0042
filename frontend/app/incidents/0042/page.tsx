"use client";

import { FormEvent, useState } from "react";
import { incident0042 } from "@/data/incidents/0042";
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
        "session jsmith    Review post-authentication activity",
        "conclude          Submit final case conclusion",
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

if (input === "session jsmith") {
  discoverEvidence("E-008 — Suspicious post-authentication activity");

  return [
    "SESSION ACTIVITY — JSMITH",
    "",
    "03:22  LOGIN_SUCCESSFUL",
    "03:24  MAILBOX_ACCESSED",
    "03:25  INBOX_RULE_CREATED",
    "03:27  FINANCE_FILES_ACCESSED",
    "",
    "[!] POST-AUTHENTICATION ACTIVITY",
    "Sensitive resources were accessed immediately",
    "after the suspicious authentication.",
    "",
    "Activity originated from the same unrecognized",
    "device and suspicious external network.",
    "",
    "[+] EVIDENCE DISCOVERED",
    "E-008 — Suspicious post-authentication activity",
  ];
}

if (input === "conclude") {
  if (evidence.length < 8) {
    return [
      "CASE CONCLUSION",
      "",
      "[!] INSUFFICIENT EVIDENCE",
      `Evidence collected: ${evidence.length} / 8`,
      "",
      "Complete the investigation before",
      "submitting a final conclusion.",
    ];
  }

  setCaseStatus("COMPROMISED — MFA FATIGUE");
  setReportReady(true);

  return [
    "CASE CONCLUSION — INCIDENT 0042",
    "",
    "[+] ACCOUNT COMPROMISE CONFIRMED",
    "",
    "ANALYST PERFORMANCE",
    `Score:          ${score} / 800`,
    "Rating:         A — EXCELLENT",
    "",
    "User:          Jordan Smith (jsmith)",
    "Attack Method: MFA FATIGUE / PUSH BOMBING",
    "Result:        UNAUTHORIZED ACCESS",
    "",
    "The attacker obtained valid credentials and",
    "repeatedly triggered MFA challenges.",
    "",
    "After multiple denied requests, an MFA",
    "challenge was accepted at 03:22.",
    "",
    "The successful authentication originated from",
    "a suspicious external network and an",
    "unrecognized device.",
    "",
    "Post-authentication activity confirms the",
    "account was accessed by the attacker.",
    "",
    "[+] INCIDENT 0042 RESOLVED",
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

<div className="mt-8 border-t border-zinc-800 pt-6">
  <p className="text-xs text-zinc-600 tracking-widest">
    INCIDENT DETAILS
  </p>

  <div className="mt-4 grid grid-cols-2 gap-6 text-sm">
    <div>
      <p className="text-zinc-600">Affected User</p>
      <p className="text-zinc-300 mt-1">{incident0042.employee.name} ({incident0042.employee.username})</p>
    </div>

    <div>
      <p className="text-zinc-600">Department</p>
      <p className="text-zinc-300 mt-1">{incident0042.employee.department}</p>
    </div>

    <div>
      <p className="text-zinc-600">Incident Type</p>
      <p className="text-zinc-300 mt-1">{incident0042.incidentType}</p>
    </div>

    <div>
      <p className="text-zinc-600">Attack Method</p>
      <p className="text-zinc-300 mt-1">{incident0042.attackMethod}</p>
    </div>

    <div>
      <p className="text-zinc-600">Authentication Time</p>
      <p className="text-zinc-300 mt-1">{incident0042.authenticationTime}</p>
    </div>

    <div>
      <p className="text-zinc-600">Final Status</p>
      <p className="text-yellow-500 mt-1">COMPROMISED</p>
    </div>
  </div>
</div>

<div className="mt-8 border-t border-zinc-800 pt-6">
  <p className="text-xs text-zinc-600 tracking-widest">
    EVIDENCE & FINDINGS
  </p>

  <div className="mt-4 space-y-4 text-sm">
    {evidence.map((item, index) => (
      <div
        key={index}
        className="border-l-2 border-green-500 pl-4"
      >
        <p className="text-zinc-300">{item}</p>
      </div>
    ))}
  </div>
</div>

<div className="mt-8 border-t border-zinc-800 pt-6">
  <p className="text-xs text-zinc-600 tracking-widest">
    ATTACK TIMELINE
  </p>

  <div className="mt-4 space-y-3 text-sm">
{incident0042.timeline.map((event, index) => (
  <div key={index} className="flex gap-6">
    <span className="text-zinc-600 w-16">{event.time}</span>
    <span className="text-zinc-300">{event.event}</span>
        </div>
      ))}
  </div>

<div className="mt-8 border-t border-zinc-800 pt-6">
  <p className="text-xs text-zinc-600 tracking-widest">
    RECOMMENDED REMEDIATION
  </p>

  <div className="mt-4 space-y-4 text-sm">
    <div className="border-l-2 border-red-500 pl-4">
      <p className="text-zinc-300">1. Disable compromised account sessions</p>
      <p className="text-zinc-600 mt-1">
        Revoke all active sessions and authentication tokens associated with jsmith.
      </p>
    </div>

    <div className="border-l-2 border-yellow-500 pl-4">
      <p className="text-zinc-300">2. Reset account credentials</p>
      <p className="text-zinc-600 mt-1">
        Force a password reset and verify the account owner before restoring access.
      </p>
    </div>

    <div className="border-l-2 border-yellow-500 pl-4">
      <p className="text-zinc-300">3. Reconfigure MFA</p>
      <p className="text-zinc-600 mt-1">
        Re-register MFA and replace push-based approval with phishing-resistant authentication where possible.
      </p>
    </div>

    <div className="border-l-2 border-zinc-600 pl-4">
      <p className="text-zinc-300">4. Remove malicious mailbox changes</p>
      <p className="text-zinc-600 mt-1">
        Review and remove unauthorized inbox rules, forwarding rules, and suspicious mailbox configuration changes.
      </p>
    </div>

    <div className="border-l-2 border-zinc-600 pl-4">
      <p className="text-zinc-300">5. Review impacted Finance resources</p>
      <p className="text-zinc-600 mt-1">
        Determine which Finance files were accessed and assess whether sensitive data was exposed or modified.
      </p>
    </div>

    <div className="border-l-2 border-green-500 pl-4">
      <p className="text-zinc-300">6. Increase monitoring</p>
      <p className="text-zinc-600 mt-1">
        Monitor the account, source infrastructure, and related authentication activity for additional indicators of compromise.
      </p>
    </div>
  </div>
</div>
</div>
    </div>
  </div>
)}    
</main>
  );
}
