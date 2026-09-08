# Incident 0042

> **An interactive Security Operations Center investigation and cybersecurity training platform.**

Incident 0042 is a cybersecurity project built around a simple idea:

**Cybersecurity analysts should be able to practice investigations by actually investigating.**

Rather than presenting users with multiple-choice questions, static lessons, or a predetermined walkthrough, Incident 0042 places the user in the role of a Security Operations Center (SOC) analyst responsible for investigating a security incident.

The analyst is presented with an alert, limited initial information, and an investigation terminal. From there, they must determine what happened.

They can inspect identities, authentication events, endpoints, IP addresses, MFA activity, geographic anomalies, session behavior, timelines, and other evidence. As the investigation progresses, evidence is collected, the scope of the incident becomes clearer, and the analyst must eventually determine whether the activity represents a legitimate event or an actual compromise.

Incident 0042 is currently the first working scenario and the foundation for a much larger project.

The long-term objective is to develop the platform into a reusable cybersecurity investigation environment capable of supporting realistic training for SOC analysts, incident responders, security teams, students, and eventually potentially government or corporate enterprise environments.

This repository documents that development from the beginning.

---

# Table of Contents

- [What is Incident 0042?](#what-is-incident-0042)
- [Why This Project Exists](#why-this-project-exists)
- [Current Scenario](#current-scenario)
- [How the Investigation Works](#how-the-investigation-works)
- [Investigation Commands](#investigation-commands)
- [Evidence System](#evidence-system)
- [Attack Timeline](#attack-timeline)
- [Case Resolution](#case-resolution)
- [Technical Architecture](#technical-architecture)
- [Scenario Data Architecture](#scenario-data-architecture)
- [Application State](#application-state)
- [Technology Stack](#technology-stack)
- [Development Process](#development-process)
- [Future Investigation Engine](#future-investigation-engine)
- [Enterprise Vision](#enterprise-vision)
- [Government and Public-Sector Vision](#government-and-public-sector-vision)
- [Security and Deployment Considerations](#security-and-deployment-considerations)
- [Future Scenario Categories](#future-scenario-categories)
- [Long-Term Roadmap](#long-term-roadmap)
- [Project Status](#project-status)

---

# What is Incident 0042?

Incident 0042 is an interactive SOC investigation simulator.

The current application presents the analyst with a fictional security incident involving a suspicious employee login.

The analyst does not immediately receive the answer.

Instead, they must investigate.

The interface includes a command-driven investigation terminal where different commands reveal different pieces of information about the incident.

For example:

```text
user jsmith
auth jsmith
timeline
endpoint jsmith
mfa jsmith
geo jsmith
session jsmith
evidence
conclude
```

Each command represents an investigative action.

The analyst must determine which actions are relevant, correlate information from different sources, collect sufficient evidence, and ultimately reach a conclusion.

The goal is not simply to teach what an attack looks like.

The goal is to develop the thought process used to recognize one.

---

# Why This Project Exists

There are excellent cybersecurity education platforms available today, but I wanted to explore a particular style of training.

A large amount of cybersecurity education teaches concepts first and then asks the student to prove they remember them.

For example:

> What is MFA fatigue?

or:

> Which attack involves repeatedly sending authentication requests to a user?

Those questions can be useful, but they are different from an investigation.

A SOC analyst may instead see something like:

```text
03:18  MFA push denied
03:20  MFA push denied
03:22  MFA push accepted
03:22  Authentication successful
```

The analyst has to recognize the pattern.

Then the analyst has to ask more questions.

Where did the login originate?

Was the device known?

Where was the employee located?

What happened after authentication?

Were additional resources accessed?

Did the attacker establish persistence?

Is there enough evidence to declare an incident?

Incident 0042 is being designed around that process.

The application should not simply tell the user what happened.

**The evidence should tell the story.**

---

# Current Scenario

## Incident 0042 — Suspicious Employee Login

**Difficulty:** Beginner  
**Severity:** High  
**Affected Department:** Finance  
**Affected User:** Jordan Smith (`jsmith`)

### Investigation Objective

Determine whether the employee account has been compromised and identify the attack method.

The incident begins with suspicious authentication activity associated with the employee account.

During the investigation, the analyst discovers evidence indicating repeated MFA prompts, suspicious authentication infrastructure, an unknown device, geographic anomalies, and suspicious activity following successful authentication.

The investigation ultimately develops into an account-compromise scenario involving an **MFA fatigue / push-bombing attack**.

---

# How the Investigation Works

The analyst interacts with the scenario through a simulated investigation terminal.

The application maintains terminal history, tracks evidence discovered during the investigation, calculates analyst progress, and updates the case status.

The investigation is intentionally broken into different information sources.

An analyst may start by examining the employee:

```text
user jsmith
```

They can then investigate authentication activity:

```text
auth jsmith
```

From there, they might inspect the authentication timeline:

```text
timeline
```

A suspicious source IP can be investigated:

```text
ip <address>
```

The analyst can investigate endpoint information:

```text
endpoint jsmith
```

MFA activity:

```text
mfa jsmith
```

Geographic anomalies:

```text
geo jsmith
```

And activity that occurred after authentication:

```text
session jsmith
```

The application does not require the analyst to simply click "Next."

The user is expected to investigate the case.

---

# Investigation Commands

The current investigation terminal supports commands including:

| Command | Purpose |
|---|---|
| `help` | Display available investigation commands |
| `user jsmith` | Investigate the employee account |
| `auth jsmith` | Review authentication activity |
| `timeline` | Examine the authentication timeline |
| `ip <address>` | Investigate a suspicious source IP |
| `endpoint jsmith` | Review endpoint/device information |
| `mfa jsmith` | Analyze MFA activity |
| `geo jsmith` | Examine geographic login anomalies |
| `session jsmith` | Investigate post-authentication activity |
| `evidence` | Review discovered evidence |
| `conclude` | Attempt to conclude the investigation |
| `clear` | Clear terminal output |

These commands are currently implemented for Incident 0042.

One of the long-term architectural goals is to evolve this into a reusable investigation engine where commands operate against different scenario datasets rather than being tightly coupled to a single incident.

---

# Evidence System

Incident 0042 currently contains eight discoverable evidence items.

```text
E-001  Employee account profile
E-002  Suspicious authentication sequence
E-003  Authentication timeline
E-004  Suspicious external source IP
E-005  Unknown authentication device
E-006  MFA fatigue pattern
E-007  Geographic login anomaly
E-008  Suspicious post-authentication activity
```

Each artifact contributes toward the analyst's investigation score.

The current scenario awards:

```text
100 XP per evidence item
800 XP total
```

Evidence discovery is tracked through React state.

A simplified version of the current logic looks like this:

```tsx
const [evidence, setEvidence] = useState<string[]>([]);

const discoverEvidence = (item: string) => {
  setEvidence((current) => {
    if (current.includes(item)) {
      return current;
    }

    return [...current, item];
  });
};

const score = evidence.length * 100;
```

The duplicate check is important because repeatedly executing the same investigation command should not repeatedly award points for evidence that has already been discovered.

The scoring system is intentionally simple at this stage.

Eventually, scoring could consider much more than evidence count.

Potential factors include:

- Evidence discovered
- Investigation accuracy
- Missed evidence
- False conclusions
- Investigation efficiency
- Time to resolution
- Correct attack classification
- Correct MITRE ATT&CK mapping
- Proper containment decisions
- Quality of analyst reporting
- Detection rules created
- Escalation decisions

The long-term goal is to evaluate **how the analyst investigated**, not simply whether they reached the end.

---

# Attack Timeline

One of the key pieces of Incident 0042 is the attack timeline.

The current scenario contains the following sequence:

```text
03:18  MFA push denied
03:20  MFA push denied
03:22  MFA push accepted
03:22  Suspicious login successful
03:24  Mailbox accessed
03:25  Inbox rule created
03:27  Finance files accessed
```

The timeline is important because no single event necessarily tells the entire story.

Instead, the analyst must correlate events.

Repeated denied MFA requests followed by an accepted request may indicate MFA fatigue.

A successful authentication immediately following that sequence increases suspicion.

Mailbox access and inbox-rule creation shortly afterward may indicate attacker activity after gaining access.

Access to Finance resources increases the potential scope and business impact of the incident.

The analyst must put those events together.

---

# Data-Driven Timeline

The timeline was originally written directly into the React interface.

As part of the ongoing refactor, the timeline is now stored inside the Incident 0042 scenario data.

A simplified representation looks like:

```ts
timeline: [
  { time: "03:18", event: "MFA push denied" },
  { time: "03:20", event: "MFA push denied" },
  { time: "03:22", event: "MFA push accepted" },
  { time: "03:22", event: "Suspicious login successful" },
  { time: "03:24", event: "Mailbox accessed" },
  { time: "03:25", event: "Inbox rule created" },
  { time: "03:27", event: "Finance files accessed" },
]
```

The interface then renders the data dynamically:

```tsx
{incident0042.timeline.map((event, index) => (
  <div key={index} className="flex gap-6">
    <span>{event.time}</span>
    <span>{event.event}</span>
  </div>
))}
```

This may be a relatively small technical change, but it represents an important architectural direction for the project.

The UI should eventually render incidents.

It should not contain the incidents.

---

# Scenario Data Architecture

Incident-specific information is beginning to be separated from the primary application interface.

Incident 0042 currently has a dedicated scenario data file:

```text
frontend/data/incidents/0042.ts
```

The scenario object contains information such as:

```ts
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
    // Scenario evidence
  ],

  timeline: [
    // Scenario timeline
  ],
};
```

The investigation interface imports that data:

```tsx
import { incident0042 } from "@/data/incidents/0042";
```

This allows UI components to display scenario information without duplicating the information throughout the page.

For example:

```tsx
{incident0042.title}
{incident0042.severity}
{incident0042.employee.name}
{incident0042.employee.username}
{incident0042.employee.department}
{incident0042.objective}
```

This architecture is still being developed.

Eventually, the goal is to have something closer to:

```text
data/
└── incidents/
    ├── 0042.ts
    ├── 0043.ts
    ├── 0044.ts
    ├── 0045.ts
    └── ...
```

The investigation engine could then load whichever scenario the analyst selects.

That would allow the platform to grow without creating an entirely new application for every investigation.

---

# Application State

The current application uses React state to maintain the investigation.

Examples include:

```tsx
const [command, setCommand] = useState("");
const [history, setHistory] = useState<TerminalEntry[]>([]);
const [evidence, setEvidence] = useState<string[]>([]);
const [caseStatus, setCaseStatus] = useState("INVESTIGATING");
const [reportReady, setReportReady] = useState(false);
const [reportOpen, setReportOpen] = useState(false);
```

These values represent different pieces of the analyst's current investigation.

`command` stores the current terminal command.

`history` maintains terminal activity.

`evidence` tracks discovered artifacts.

`caseStatus` represents the current investigation state.

`reportReady` and `reportOpen` control the final incident report workflow.

As the platform grows, some of this state may eventually move into a more complete investigation-session architecture capable of saving analyst progress and restoring investigations across sessions.

---

# Case Resolution

The analyst cannot simply open the investigation and immediately declare the answer.

The application tracks whether sufficient evidence has been collected.

Once the evidence chain is complete, the analyst can use:

```text
conclude
```

to complete the investigation.

The final case status identifies the account compromise and attack method.

For the current scenario:

```text
COMPROMISED — MFA FATIGUE
```

The application can then present the analyst with an incident report summarizing the investigation.

---

# Incident Reporting

Incident response does not end with recognizing malicious activity.

Analysts need to communicate what happened.

Incident 0042 therefore includes a report workflow containing information about the affected user, incident classification, attack method, authentication activity, attack timeline, and recommended remediation.

The goal is eventually to make reporting a larger part of the simulation.

Future versions could require analysts to document:

- Executive summary
- Incident severity
- Initial access
- Affected identities
- Affected endpoints
- Indicators of compromise
- Timeline
- Attacker actions
- MITRE ATT&CK techniques
- Business impact
- Containment actions
- Eradication actions
- Recovery actions
- Lessons learned

The analyst's report could eventually become part of their scenario score.

---

# Recommended Remediation

Incident 0042 currently teaches that investigation should lead to action.

The scenario includes remediation recommendations such as:

1. Disable compromised account sessions.
2. Revoke active authentication tokens.
3. Reset account credentials.
4. Verify the identity of the legitimate account owner.
5. Reconfigure MFA.
6. Remove malicious mailbox changes.
7. Review impacted Finance resources.
8. Determine which files were accessed.
9. Increase monitoring around the affected account and attacker infrastructure.

This introduces the analyst to the transition from detection into incident response.

---

# Technology Stack

The project currently uses:

### Frontend

- Next.js
- React
- TypeScript
- Tailwind-style utility classes

### Development

- Linux
- Node.js
- npm
- Git
- GitHub

### Current Architecture

```text
Next.js Application
        |
        v
Incident Interface
        |
        +---- Investigation Terminal
        |
        +---- Evidence Tracking
        |
        +---- Case Status
        |
        +---- Analyst Score
        |
        +---- Incident Report
        |
        v
Scenario Data
        |
        +---- Incident Metadata
        +---- Employee Information
        +---- Evidence
        +---- Timeline
```

The architecture will continue to change as the application grows.

---

# Development Process

Incident 0042 is being built incrementally.

Features are implemented in small stages, tested, and committed through Git.

Production builds are regularly run using:

```bash
npm run build
```

This verifies that the Next.js application compiles successfully and that TypeScript and JSX changes remain valid.

Git is being used throughout development to maintain checkpoints as the project changes.

This repository is therefore not only the finished application.

It is also a record of the engineering process used to build it.

---

# What I Am Learning Through This Project

My primary focus is cybersecurity.

This project has required me to expand into software development because building the type of training platform I envision requires understanding both areas.

Development has involved learning and working with:

- React
- TypeScript
- Next.js
- Component architecture
- State management
- Data modeling
- Debugging
- Git
- GitHub
- Application design
- UI/UX decisions

At the same time, the scenarios require thinking about:

- SOC workflows
- Authentication telemetry
- Identity security
- Endpoint investigation
- MFA attacks
- Incident timelines
- Evidence correlation
- Incident response
- Analyst reporting

That combination is intentional.

Incident 0042 sits between software engineering and defensive cybersecurity.

---

# Future Investigation Engine

The current terminal is scenario-specific.

The long-term objective is to turn it into a more generalized investigation engine.

Instead of hard-coding:

```text
mfa jsmith
```

to return one predetermined result, a future engine could interpret:

```text
mfa <user>
```

and query the currently loaded scenario.

The same concept could apply to:

```text
user <username>
auth <username>
endpoint <hostname>
ip <address>
process <pid>
hash <sha256>
dns <domain>
network <address>
email <message-id>
cloud <resource>
```

Each scenario could define which entities exist and which investigative paths are available.

This would allow substantially more complex investigations.

---

# Moving Beyond Linear Scenarios

A major future goal is to prevent investigations from feeling scripted.

Real incidents contain noise.

An analyst may investigate something that turns out to be harmless.

Two alerts that appear related may actually be unrelated.

A suspicious IP address may belong to legitimate infrastructure.

A user may actually be traveling.

An endpoint may contain unusual but authorized software.

Future scenarios could therefore include:

- False positives
- Benign anomalies
- Dead-end investigation paths
- Incomplete evidence
- Conflicting evidence
- Multiple users
- Multiple endpoints
- Multiple attackers
- Multiple simultaneous alerts
- Time-sensitive decisions

The analyst would need to distinguish evidence from noise.

---

# Future Scenario Categories

The platform is intended to eventually cover multiple areas of defensive security.

## Identity Security

Potential scenarios include:

- Password spraying
- Credential stuffing
- MFA fatigue
- Impossible travel
- Session-token theft
- OAuth abuse
- Privileged-account compromise
- Business email compromise

## Endpoint Security

Potential investigations include:

- Malware execution
- Suspicious PowerShell
- LOLBins
- Persistence
- Credential dumping
- Process injection
- Ransomware
- Unauthorized software
- EDR alerts

## Network Security

Potential investigations include:

- Command-and-control traffic
- DNS tunneling
- Reconnaissance
- Lateral movement
- Beaconing
- Data exfiltration
- Suspicious VPN activity

## Cloud Security

Potential investigations include:

- Compromised cloud credentials
- IAM privilege escalation
- Suspicious API calls
- Unauthorized infrastructure
- Exposed storage
- Cloud persistence
- Secret/key compromise

## Email Security

Potential investigations include:

- Phishing
- Malicious attachments
- Malicious links
- Business email compromise
- Inbox-rule persistence
- Credential harvesting

## Detection Engineering

Eventually, an analyst could be asked to turn their investigation into a detection.

Possible tasks could involve:

```text
Sigma
KQL
SPL
YARA
SIEM correlation
IOC matching
behavioral detection
```

The analyst would not only identify the attack.

They would help prevent the same activity from going undetected in the future.

---

# MITRE ATT&CK Integration

A future objective is to map scenario activity to the MITRE ATT&CK framework.

Rather than simply displaying ATT&CK technique IDs, the application could require analysts to determine which techniques were observed during the investigation.

This could allow scenarios to teach the relationship between raw telemetry, analyst observations, attacker behavior, and standardized threat classifications.

---

# Analyst Progression

Eventually, Incident 0042 could become the first investigation in a much larger analyst progression system.

A new analyst might begin with:

```text
BEGINNER
Incident 0042
Suspicious Employee Login
```

Later scenarios could introduce larger datasets and fewer hints.

Progression could eventually include:

```text
Tier 1 SOC Analyst
        ↓
Tier 2 SOC Analyst
        ↓
Senior SOC Analyst
        ↓
Incident Responder
        ↓
Threat Hunter
        ↓
Detection Engineer
```

This does not necessarily need to represent literal job titles.

The purpose would be to gradually increase investigative complexity and analyst independence.

---

# Enterprise Vision

The long-term ambition for this project extends beyond a portfolio application.

One possible direction is adapting the platform into a cybersecurity training environment suitable for **corporate and enterprise security teams**.

A mature version of the platform could allow an organization to create training scenarios based on the types of incidents its SOC is expected to investigate.

For example, an enterprise could create simulated incidents involving its general technology environment:

```text
Identity Provider
        |
        +---- Authentication Logs
        |
        +---- MFA Events
        |
        v
        SIEM
       /    \
      /      \
 Endpoint    Network
Telemetry    Telemetry
      \      /
       \    /
      SOC Analyst
```

The analyst could investigate simulated versions of those data sources through one training interface.

Importantly, a production training environment should not require exposing real sensitive incident data.

Organizations could build sanitized, synthetic, or carefully anonymized scenarios representing realistic attack patterns without placing operational information into the training system.

Potential enterprise uses could include:

- New SOC analyst onboarding
- Analyst skill development
- Incident-response exercises
- Tabletop exercises with interactive technical components
- Detection-engineering training
- Internal certification
- Team readiness assessments
- Scenario-based evaluations
- Security operations process testing

Organizations could potentially create their own scenario libraries based on the technologies and procedures relevant to their environment.

---

# Government and Public-Sector Vision

Another long-term direction is the possibility of adapting the platform for government or public-sector cybersecurity training.

Government environments may involve different operational requirements, threat models, policies, deployment restrictions, and security controls than a normal commercial application.

A future version designed for those environments would therefore need to be built around those requirements rather than simply deploying the current web application unchanged.

Potential training applications could include:

- SOC analyst development
- Defensive cyber operations exercises
- Incident-response training
- Blue-team exercises
- Cybersecurity workforce development
- Scenario-based readiness assessments
- Threat-hunting exercises
- Detection-engineering exercises

The underlying principle would remain the same:

**Present the analyst with evidence and require them to investigate.**

However, the platform would need to support significantly stronger deployment, auditing, access-control, data-handling, and security requirements before this could become a realistic operational direction.

---

# Security and Deployment Considerations

The current application is a development-stage training project.

It should not be confused with a production SOC platform.

Moving toward enterprise or government use would require substantial additional engineering.

Areas that would need to be addressed include:

### Authentication

A production platform would require strong user authentication and account management.

Potential requirements could include:

- SSO
- MFA
- Identity-provider integration
- Session management

### Authorization

Different users may require different privileges.

Potential roles could include:

```text
Student
Analyst
Instructor
Scenario Author
Administrator
Auditor
```

A mature system would require proper role-based access control.

### Audit Logging

Administrative and analyst activity may need to be recorded for accountability and troubleshooting.

### Data Protection

Sensitive training information would require appropriate protection both in transit and at rest.

### Secure Development

A production system would require a formal secure-development process including areas such as:

- Dependency management
- Vulnerability scanning
- Security testing
- Code review
- Secret management
- Input validation
- Secure configuration
- Logging and monitoring

### Deployment Models

Different organizations may have different requirements.

Potential future deployment models could include:

```text
Cloud Hosted
Private Cloud
On-Premises
Isolated Training Environment
```

Government deployments could potentially require additional controls depending on the organization, data classification, authorization requirements, and environment.

These capabilities do **not** exist in the current prototype.

They represent engineering requirements that would need to be addressed if the project ever moves toward those environments.

---

# Scenario Authoring

One of the most important future capabilities would be allowing new investigations to be created without modifying the core application.

The current move toward files such as:

```text
0042.ts
0043.ts
0044.ts
```

is an early step toward this.

Eventually, a scenario could define:

```text
Incident Metadata
Users
Endpoints
Authentication Events
Network Events
Cloud Events
Evidence
Commands
Attack Timeline
Expected Findings
ATT&CK Techniques
Scoring Rules
Remediation
Final Conclusion
```

A scenario authoring system could eventually provide an interface for instructors or security teams to create investigations without writing application code.

That would be particularly important if the platform were ever used by organizations.

---

# Synthetic Telemetry

Another major long-term goal is expanding scenarios beyond predetermined text responses.

Future investigations could contain synthetic security telemetry resembling the information analysts encounter in real environments.

Examples could include:

```text
Authentication logs
Windows event logs
EDR telemetry
Firewall logs
DNS logs
Proxy logs
Email events
Cloud audit events
Identity-provider events
SIEM alerts
```

The important distinction would be that this data is generated for training.

The analyst could search, filter, correlate, and investigate it without requiring access to a real organization's sensitive production logs.

---

# Possible Future Architecture

A mature version of the platform could eventually resemble:

```text
                    ┌─────────────────────┐
                    │   Analyst Portal    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Investigation Engine│
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       Identity Data      Endpoint Data      Network Data
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Evidence Engine   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Scoring / Evaluation│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Incident Report    │
                    └─────────────────────┘
```

Scenario authors could sit on another side of the platform:

```text
Instructor / Security Team
           |
           v
    Scenario Builder
           |
           v
     Scenario Library
           |
           v
 Investigation Engine
```

This is a long-term architectural concept, not the current implementation.

---

# Organizational Scenario Libraries

If the project eventually reaches an enterprise-ready stage, organizations could potentially maintain private scenario libraries.

For example:

```text
Organization Scenario Library

├── Identity
│   ├── Password Spray
│   ├── MFA Fatigue
│   └── Session Theft
│
├── Endpoint
│   ├── Malware
│   ├── PowerShell Abuse
│   └── Ransomware
│
├── Cloud
│   ├── IAM Compromise
│   └── Suspicious API Activity
│
└── Network
    ├── C2 Beaconing
    └── Data Exfiltration
```

Training administrators could assign investigations based on analyst role, experience level, or organizational requirements.

---

# Measuring Analyst Development

A future platform could also provide instructors with information about analyst performance.

For example:

```text
Analyst: Example User

Scenario Completion:       14 / 16
Evidence Identification:   92%
Attack Classification:     88%
Containment Decisions:     85%
Average Investigation:     17m 42s
```

More importantly, the system could identify areas where an analyst needs additional practice.

For example:

```text
Strong:
✓ Identity investigation
✓ Authentication analysis

Needs improvement:
△ Network investigation
△ Cloud incident response
△ Detection engineering
```

This could allow training to become adaptive rather than identical for every analyst.

Any future employee-evaluation use would need careful governance, transparency, and human oversight; training scores should not be treated as an automatic substitute for professional judgment.

---

# What This Project Is Not

Incident 0042 is currently **not**:

- A SIEM
- An EDR platform
- A production incident-response system
- A replacement for security analysts
- A government-certified cybersecurity product
- An enterprise-ready security platform

It is currently an interactive cybersecurity investigation project and an evolving training-platform prototype.

The distinction matters.

The objective is to build toward larger capabilities without overstating what has already been implemented.

---

# End Goal

The ultimate goal is much larger than Incident 0042.

I want to explore whether this project can evolve into a platform capable of helping people learn how to think and operate as defensive cybersecurity analysts.

The vision is an environment where a user can begin with a relatively straightforward suspicious-login investigation and eventually progress to complex incidents involving multiple identities, endpoints, networks, cloud systems, and attacker techniques.

At the beginning, the platform teaches the analyst where to look.

As the analyst progresses, it provides less guidance.

Eventually, the analyst should be presented with an incident and expected to determine the investigative path independently.

The progression could look something like:

```text
Guided Investigation
        ↓
Independent Investigation
        ↓
Multi-Source Investigation
        ↓
Incident Response
        ↓
Threat Hunting
        ↓
Detection Engineering
        ↓
Advanced Defensive Operations
```

At an organizational level, the larger goal would be to provide security teams with a controlled environment where analysts can practice incidents before they encounter similar situations in production.

That could potentially mean corporate SOC training.

It could potentially mean enterprise incident-response exercises.

And, if the platform eventually meets the necessary engineering, security, compliance, accessibility, deployment, and authorization requirements, it could potentially support government or public-sector cybersecurity training environments.

That is a long-term objective.

There is a significant amount of engineering between the current prototype and that destination.

But that is the direction of the project.

---

# Development Philosophy

Incident 0042 is being built one capability at a time.

The project does not currently attempt to hide the fact that it is under development.

Instead, the repository documents that progression.

A hard-coded value becomes scenario data.

Repeated UI becomes reusable logic.

A single incident becomes an investigation engine.

An investigation engine becomes a scenario platform.

The intention is to build the foundation correctly enough that each stage makes the next stage possible.

---

# Current Development Status

### Implemented

- [x] Incident 0042 scenario
- [x] Interactive SOC investigation terminal
- [x] Command processing
- [x] Terminal history
- [x] Employee investigation
- [x] Authentication investigation
- [x] Source IP investigation
- [x] Endpoint investigation
- [x] MFA investigation
- [x] Geographic anomaly investigation
- [x] Session investigation
- [x] Evidence discovery
- [x] Evidence tracking
- [x] Analyst scoring
- [x] Dynamic case status
- [x] Investigation conclusion
- [x] Incident report
- [x] Remediation guidance
- [x] Reusable Incident 0042 scenario data
- [x] Data-driven attack timeline
- [x] Production Next.js build validation

### In Progress

- [ ] Continue separating scenario data from UI logic
- [ ] Remove remaining Incident 0042 hard-coded values
- [ ] Generalize the investigation architecture
- [ ] Prepare the application for multiple incidents

### Future

- [ ] Incident selection
- [ ] Multiple investigation scenarios
- [ ] Analyst profiles
- [ ] Persistent progress
- [ ] Advanced scoring
- [ ] Scenario difficulty
- [ ] MITRE ATT&CK integration
- [ ] Synthetic telemetry
- [ ] Detection engineering
- [ ] Threat hunting scenarios
- [ ] Scenario authoring
- [ ] Instructor functionality
- [ ] Organizational scenario libraries
- [ ] Authentication and authorization
- [ ] Enterprise security controls
- [ ] Administrative auditing
- [ ] Deployment architecture
- [ ] Enterprise training capabilities
- [ ] Public-sector deployment research

---

# Final Note

Incident 0042 began as a portfolio project centered on a suspicious employee login.

It is still early in development.

But the goal is not to stop at Incident 0042.

The goal is to use this first investigation to build the foundation for a larger system where cybersecurity analysts can practice investigating realistic incidents, correlate evidence, make decisions, document findings, and learn from the consequences of those decisions.

The project will continue to change as both the cybersecurity scenarios and the software architecture become more sophisticated.

**Incident 0042 is the first case, not the final product.**
