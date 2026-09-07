export const incident0042 = {
  id: "0042",
  title: "Suspicious Employee Login",
  difficulty: "Beginner",
  severity: "High",
  objective:
    "Determine whether the employee account has been compromised and identify the attack method.",

  employee: {
    name: "Jordan Smith",
    username: "jsmith",
    department: "Finance",
  },

  xpReward: 800,

evidence: [
  {
    id: "E-001",
    title: "Employee account profile",
    points: 100,
  },
  {
    id: "E-002",
    title: "Suspicious authentication sequence",
    points: 100,
  },
  {
    id: "E-003",
    title: "Authentication timeline",
    points: 100,
  },
  {
    id: "E-004",
    title: "Suspicious external source IP",
    points: 100,
  },
  {
    id: "E-005",
    title: "Unknown authentication device",
    points: 100,
  },
  {
    id: "E-006",
    title: "MFA fatigue pattern",
    points: 100,
  },
  {
    id: "E-007",
    title: "Geographic login anomaly",
    points: 100,
  },
  {
    id: "E-008",
    title: "Suspicious post-authentication activity",
    points: 100,
  },
],
  timeline: [
    {
      time: "03:18",
      event: "MFA push denied",
    },
    {
      time: "03:20",
      event: "MFA push denied",
    },
    {
      time: "03:22",
      event: "MFA push accepted",
    },
    {
      time: "03:22",
      event: "Suspicious login successful",
    },
    {
      time: "03:24",
      event: "Mailbox accessed",
    },
    {
      time: "03:25",
      event: "Inbox rule created",
    },
    {
      time: "03:27",
      event: "Finance files accessed",
    },
  ],
};
