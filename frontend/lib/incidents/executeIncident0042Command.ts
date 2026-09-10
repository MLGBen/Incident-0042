type ExecuteIncident0042CommandOptions = {
  evidence: string[];
  score: number;
  discoverEvidence: (item: string) => void;
  setCaseStatus: (status: string) => void;
  setReportReady: (ready: boolean) => void;
};

export const executeIncident0042Command = (
  rawCommand: string,
  {
    evidence,
    score,
    discoverEvidence,
    setCaseStatus,
    setReportReady,
  }: ExecuteIncident0042CommandOptions,
): string[] => {
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
      "AUTHENTICATION LOGS — JSMITH",
      "",
      "03:18  MFA push denied",
      "03:20  MFA push denied",
      "03:22  MFA push accepted",
      "03:22  Login successful",
      "",
      "[!] Suspicious authentication sequence detected.",
      "",
      "[+] EVIDENCE DISCOVERED",
      "E-002 — Suspicious authentication sequence",
    ];
  }

  if (input === "timeline") {
    discoverEvidence("E-003 — Authentication timeline");

    return [
      "INCIDENT TIMELINE — 0042",
      "",
      "03:18  MFA push denied",
      "03:20  MFA push denied",
      "03:22  MFA push accepted",
      "03:22  Suspicious login successful",
      "03:24  Mailbox accessed",
      "03:25  Inbox rule created",
      "03:27  Finance files accessed",
      "",
      "[+] EVIDENCE DISCOVERED",
      "E-003 — Authentication timeline",
    ];
  }

  if (input.startsWith("ip ")) {
    const ipAddress = rawCommand.trim().split(/\s+/)[1];

    if (!ipAddress) {
      return [
        "IP INVESTIGATION",
        "",
        "[!] No IP address supplied.",
        "Usage: ip <address>",
      ];
    }

    discoverEvidence("E-004 — Suspicious external source IP");

    return [
      `IP INVESTIGATION — ${ipAddress}`,
      "",
      "Classification: EXTERNAL",
      "Reputation:     SUSPICIOUS",
      "Context:        Source associated with anomalous authentication activity",
      "",
      "[+] EVIDENCE DISCOVERED",
      "E-004 — Suspicious external source IP",
    ];
  }

  if (input === "endpoint jsmith") {
    discoverEvidence("E-005 — Unknown authentication device");

    return [
      "ENDPOINT TELEMETRY — JSMITH",
      "",
      "Known endpoint: FIN-WS-042",
      "OS:             Windows 11",
      "EDR:            ONLINE",
      "Last seen:      03:11",
      "",
      "Authentication device at 03:22:",
      "Browser:        Chrome",
      "Platform:       Linux",
      "Device:         UNKNOWN",
      "",
      "[!] Authentication originated from an unrecognized device.",
      "",
      "[+] EVIDENCE DISCOVERED",
      "E-005 — Unknown authentication device",
    ];
  }

  if (input === "mfa jsmith") {
    discoverEvidence("E-006 — MFA fatigue pattern");

    return [
      "MFA CHALLENGE ACTIVITY — JSMITH",
      "",
      "03:18  PUSH  DENIED",
      "03:20  PUSH  DENIED",
      "03:22  PUSH  ACCEPTED",
      "",
      "[!] Multiple MFA prompts preceded a successful authentication.",
      "[!] Pattern consistent with MFA fatigue / push bombing.",
      "",
      "[+] EVIDENCE DISCOVERED",
      "E-006 — MFA fatigue pattern",
    ];
  }

  if (input === "geo jsmith") {
    discoverEvidence("E-007 — Geographic login anomaly");

    return [
      "LOGIN GEOGRAPHY — JSMITH",
      "",
      "Expected user location: Corporate / known employee region",
      "Observed login source:  Unrecognized external location",
      "",
      "[!] Geographic activity is inconsistent with the user's normal access pattern.",
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
      "03:22  Suspicious login successful",
      "03:24  Mailbox accessed",
      "03:25  Inbox rule created",
      "03:27  Finance files accessed",
      "",
      "[!] Post-authentication behavior indicates unauthorized account use.",
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
      `Score: ${score} / 800`,
      "",
      "Attack method: MFA Fatigue / Push Bombing",
      "",
      "The employee account was compromised after repeated",
      "MFA push requests resulted in an accepted challenge.",
      "",
      "[+] FINAL REPORT AVAILABLE",
    ];
  }

  if (input === "evidence") {
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
