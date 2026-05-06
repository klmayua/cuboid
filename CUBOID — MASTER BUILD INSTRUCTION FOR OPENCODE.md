# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume I — Core Build Doctrine

### Section 1 — Mission / Build Philosophy

**Instruction Type:** Foundational Engineering Directive  
**Applies To:** Product, Design, Frontend, Mobile, Backend, DevOps, Security, QA, Data, Compliance Engineering  
**Authoring Institution:** Insane Technologies  
**Project:** Cuboid  
**Architecture Type:** Modular Full-Stack Economic Infrastructure Platform  
**Directive Status:** Non-Negotiable Foundational Instruction

---

# 1.0 CORE BUILD DIRECTIVE

Build Cuboid as **institutional economic infrastructure**, not as a startup application.

This distinction is mandatory.

Cuboid is not:

- a remittance app,  
- a wallet app,  
- a money transfer clone,  
- a neobank clone,  
- a simple marketplace,  
- a CRUD dashboard platform.

Cuboid is:

- orchestration infrastructure,  
- trust infrastructure,  
- compliance infrastructure,  
- routing infrastructure,  
- settlement infrastructure,  
- identity infrastructure,  
- treasury infrastructure,  
- programmable financial middleware.

Every engineering decision must reflect that.

---

# 1.1 BUILD PRINCIPLE — INFRASTRUCTURE FIRST

Opencode MUST build backend institutional machinery first.

UI is secondary.

Core first:

1. Domain model  
2. Event architecture  
3. Ledger engine  
4. State management  
5. Trust computation  
6. Compliance pipeline  
7. Partner integration layer  
8. Reconciliation engine  
9. Routing engine  
10. Observability layer

Then interfaces.

Never reverse this order.

Pretty broken software is still broken software.

---

# 1.2 BUILD PRINCIPLE — MODULAR FULL STACK

Architect once for the complete Cuboid ecosystem.

Deploy incrementally.

Never build isolated products.

Everything must plug into one unified platform.

Modules:

- Cuboid Connect  
- Cuboid FX  
- Cuboid Treasury  
- Cuboid Pay  
- Cuboid Trade  
- Cuboid Identity  
- Cuboid Capital  
- Cuboid Network

Every module must:

- share auth,  
- share ledger,  
- share compliance layer,  
- share trust engine,  
- share notification engine,  
- share observability,  
- share audit architecture,  
- share design system,  
- share partner abstraction layer.

No duplicated logic.

No duplicated infra.

No silo engineering.

---

# 1.3 BUILD PRINCIPLE — DOMAIN-FIRST ENGINEERING

Before writing feature code, Opencode MUST model domains.

Core domain objects:

User  
Organization  
IdentityProfile  
Wallet  
Currency  
Corridor  
LiquiditySource  
PartnerInstitution  
PartnerRoute  
TransactionIntent  
Quote  
SettlementInstruction  
EscrowInstruction  
LedgerAccount  
LedgerEntry  
BalanceSnapshot  
Counterparty  
Invoice  
Merchant  
TradeOrder  
ComplianceCase  
TrustScore  
RiskSignal  
FraudAlert  
DisputeCase  
Notification  
WebhookSubscription  
AuditEvent  
FeePolicy  
PricingRule  
KYCRecord  
KYBRecord  
Beneficiary  
FundingMethod  
PayoutMethod

All services must reference domain objects.

No loose schema design.

No random table creation.

No “we’ll fix later.”

Model first.

Build second.

---

# 1.4 BUILD PRINCIPLE — EVENT-SOURCED FINANCIAL CORE

All economic movement MUST be event-driven.

Never directly mutate financial state.

Never overwrite balances.

Never silently adjust ledger values.

Every value movement becomes immutable event history.

Examples:

TransactionCreated  
QuoteGenerated  
QuoteAccepted  
KYCApproved  
RiskCheckPassed  
PartnerAssigned  
FundsReserved  
EscrowOpened  
SettlementTriggered  
SettlementConfirmed  
SettlementFailed  
RetryQueued  
LedgerPosted  
FeeApplied  
RefundCreated  
DisputeOpened  
DisputeResolved  
SuspiciousActivityFlagged  
AccountRestricted  
NotificationSent

System state \= derived from events.

Truth \= ledger \+ event history.

This is mandatory.

---

# 1.5 BUILD PRINCIPLE — TRUST AS COMPUTATION

Trust is not marketing.

Trust is software.

Build trust as measurable output.

Trust engine must compute:

- identity confidence  
- device confidence  
- transaction pattern confidence  
- counterparty confidence  
- corridor confidence  
- fraud probability  
- execution reliability  
- settlement reliability  
- partner reliability  
- dispute behavior  
- sanctions exposure  
- compliance exposure

Every actor gets trust score layers.

Every transaction gets trust score layers.

Trust affects:

- routing,  
- pricing,  
- approval thresholds,  
- settlement speed,  
- fraud review,  
- partner selection,  
- risk holds,  
- dispute handling.

Trust must be programmable.

---

# 1.6 BUILD PRINCIPLE — COMPLIANCE EMBEDDED

Compliance is not back office.

Compliance is architecture.

Embed into:

- signup  
- onboarding  
- account creation  
- transaction creation  
- quote generation  
- settlement  
- payout  
- withdrawal  
- reconciliation  
- partner routing  
- reporting  
- audit export

Mandatory engines:

KYC Engine  
KYB Engine  
AML Engine  
Sanctions Engine  
PEP Engine  
Fraud Monitoring Engine  
Case Management Engine  
Regulatory Reporting Engine

Compliance checks must be composable.

Country configurable.

Rule driven.

---

# 1.7 BUILD PRINCIPLE — PARTNER ABSTRACTION

Cuboid must integrate many external providers.

Never hardwire integrations.

Build Partner Adapter Layer.

Each partner adapter supports:

Capabilities:

- quote  
- fund  
- hold  
- transfer  
- payout  
- confirm  
- reverse  
- reconcile  
- dispute  
- report

Adapter contract:

connect()  
authenticate()  
healthCheck()  
quote()  
fund()  
holdFunds()  
releaseFunds()  
settle()  
confirmSettlement()  
reverse()  
reconcile()  
report()  
handleWebhook()

All partners normalize into Cuboid standard interface.

Plug-and-play rails.

---

# 1.8 BUILD PRINCIPLE — API-FIRST

Everything exposes APIs.

Web uses APIs.

Mobile uses APIs.

Partners use APIs.

Admin uses APIs.

Regulators use APIs.

Public API gateway:

REST \+ GraphQL optional

Internal:

gRPC / async events

Documentation mandatory.

OpenAPI mandatory.

Webhook architecture mandatory.

SDK generation mandatory.

---

# 1.9 BUILD PRINCIPLE — SECURITY DEFAULT

Security begins at architecture.

Mandatory:

Zero Trust Access  
RBAC  
ABAC  
MFA  
Device fingerprinting  
IP intelligence  
Secrets vault  
Signed requests  
Encryption at rest  
Encryption in transit  
Audit trails  
Session anomaly detection  
Rate limiting  
Fraud throttling  
Webhook signatures  
Immutable logs  
Key rotation  
Pen testing pipeline

No shortcuts.

No hardcoded secrets.

No insecure defaults.

---

# 1.10 BUILD PRINCIPLE — OBSERVABILITY

Every service must emit:

logs  
metrics  
traces  
health state  
dependency state  
latency metrics  
error classification  
audit streams  
business KPIs

Every transaction traceable end-to-end.

Every failure diagnosable.

No black boxes.

---

# 1.11 BUILD PRINCIPLE — AFRICA-FIRST ENGINEERING

Build for:

- low bandwidth  
- unstable connectivity  
- mobile-first users  
- USSD bridge possibility  
- corridor diversity  
- multiple currencies  
- local compliance variance  
- partial digital identity environments  
- variable settlement timing  
- hybrid formal/informal market realities

Offline resilience where possible.

Async recovery mandatory.

Graceful degradation mandatory.

---

# 1.12 BUILD PRINCIPLE — BORING RELIABILITY

Cuboid must feel:

predictable  
clear  
fast  
stable  
trustworthy  
auditable

Infrastructure should not feel dramatic.

No surprises.

No chaos.

No magic.

Reliable beats flashy.

Always.

---

# END SECTION 1

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume I — Core Build Doctrine

### Section 2 — Brand System \+ Design Tokens \+ Visual Doctrine

**Instruction Type:** Visual Systems Engineering Directive  
**Applies To:** UI/UX, Frontend Engineering, Mobile Engineering, Product Design, Brand Systems, Motion Design  
**Directive Status:** Non-Negotiable  
**Authoring Institution:** Insane Technologies  
**Design Intent:** Institutional Trust \+ Premium Simplicity \+ Invisible Complexity

---

# 2.0 CORE VISUAL PHILOSOPHY

Build Cuboid to look like:

**institutional infrastructure disguised as effortless premium software**

The product must visually communicate:

- trust,  
- sophistication,  
- stability,  
- clarity,  
- intelligence,  
- transparency,  
- calm control,  
- premium quality,  
- operational seriousness.

Never playful.

Never gimmicky.

Never crypto-bro aesthetics.

Never casino fintech.

Never flashy neon overload.

Never cluttered.

Never generic SaaS.

Cuboid should feel like:

financial architecture.

Calm power.

Deep trust.

Quiet confidence.

Invisible sophistication.

If users see Cuboid and think:

**"serious money moves here"**

design is correct.

---

# 2.1 LOGO SYSTEM

Use approved Cuboid logo mark exactly as defined:

Logo characteristics:

- geometric cube abstraction  
- subtle trust/safe motif  
- line separation across cube faces  
- secure split detail retained  
- flat scalable SVG master  
- icon-safe at 16px+  
- legible monochrome version  
- embossed dark mode version  
- flat light mode version

Mandatory variants:

1. Full Logo  
2. Wordmark  
3. Mark-only  
4. Monochrome dark  
5. Monochrome light  
6. App icon  
7. Favicon  
8. Watermark

Never distort.

Never bevel excessively.

Never rotate.

Never stretch.

Never recolor arbitrarily.

Never place on noisy backgrounds.

Respect clear-space \= 1× cube width minimum.

---

# 2.2 COLOR SYSTEM

Primary palette locked.

## Brand Core

Deep Trust Blue: \#0A2A66

Royal Trust Blue: \#123E91

Light Trust Accent: \#5E8DFF

Midnight Core: \#05070D

Dark Surface: \#0B1020

Elevated Surface: \#10182B

Glass Surface: rgba(255,255,255,0.08)

Glass Border: rgba(255,255,255,0.14)

Hairline Border: rgba(255,255,255,0.07)

---

## Typography Colors

Primary: \#F5F8FF

Secondary: \#AAB7D1

Muted: \#7183A6

Disabled: \#51617D

Inverse: \#08111F

---

## Semantic

Success: \#17C964

Warning: \#F5A524

Danger: \#F31260

Info: \#5E8DFF

Neutral: \#7C8AA5

Pending: \#9B7CFF

Escrow: \#00B8D9

Verified: \#16D67A

Fraud: \#FF4D6D

---

## Usage Rules

60% dark neutrals

25% deep trust blue

10% accent

5% semantic

Avoid oversaturation.

Accent only for:

- CTAs  
- key indicators  
- trust highlights  
- active states  
- progress

Do not flood screens with bright blue.

Blue should feel intentional.

---

# 2.3 GLASSMORPHISM RULES

Cuboid uses restrained premium glassmorphism.

Keyword:

restrained.

Not frosted chaos.

Not blurred nonsense.

Glass style:

background: rgba(255,255,255,0.06–0.10)

backdrop-filter: blur(20px)

border: 1px solid rgba(255,255,255,0.12)

inner highlight: rgba(255,255,255,0.04)

soft elevation: subtle shadow

Rounded: 20px–28px

Use glass on:

- cards  
- overlays  
- dashboard modules  
- modal surfaces  
- command center panels  
- floating nav  
- analytics panes

Never use glass for:

dense tables

long text docs

legal pages

compliance reports

admin raw logs

There use sharp institutional surfaces.

Blend styles intelligently.

---

# 2.4 TYPOGRAPHY SYSTEM

Font direction:

Slim.

Elegant.

Symmetric.

Modern.

Premium.

Institutional.

Never bulky.

Never rounded toy fonts.

Never futuristic sci-fi fonts.

Never generic Arial feel.

Recommended stack:

Primary: Inter Tight

Secondary: Plus Jakarta Sans

Display: Manrope

Monospace: IBM Plex Mono

Use:

Inter Tight \= product default

Manrope \= hero headlines

IBM Plex Mono \= rates / IDs / transaction refs

---

## Weights

300 \= elegant large headlines

400 \= body

500 \= section emphasis

600 \= UI labels

700 \= rare emphasis

Avoid heavy 800/900 except hero impact.

Slimmer visual voice.

---

## Rhythm

Large whitespace.

Comfortable reading.

Breathing room.

No cramped dashboards.

No tiny text.

Institutional clarity.

---

# 2.5 SPACING SYSTEM

Use 8pt grid.

Scale:

4 8 12 16 24 32 40 48 64 80 96 128

Never random spacing.

Never eyeballing.

Every component tokenized.

---

# 2.6 CORNER SYSTEM

Soft premium corners:

Cards: 24px

Buttons: 16px

Inputs: 14px

Modals: 28px

Pills: 999px

Tables: 18px container

Consistency mandatory.

---

# 2.7 SHADOW SYSTEM

Soft layered shadow.

No harsh drop shadows.

No cartoon depth.

Base: subtle

Hover: slightly elevated

Modal: deep soft elevation

Focus: light blue glow

Trust aesthetic:

float gently.

Never punch hard.

---

# 2.8 ICONOGRAPHY

Style:

thin line

clean

sharp

minimal

lucide-style

Feather-style acceptable

No cartoon icons.

No 3D icons.

No emoji icon systems.

Icons \= precision tools.

---

# 2.9 COMPONENT STYLE

Buttons:

large

confident

premium

clear hierarchy

Primary: deep blue gradient glass

Secondary: ghost glass

Danger: muted danger glass

Success: clean success glass

---

Cards:

modular

high breathing room

strong hierarchy

transaction cards: clear status rails

rate cards: premium confidence

analytics: sharp typography

---

Inputs:

wide

clean

minimal chrome

clear validation

never cluttered

---

Tables:

dense but breathable

sticky headers

advanced filtering

export-ready

institutional-grade

---

# 2.10 MOTION SYSTEM

Motion:

calm

premium

purposeful

fast but smooth

Use:

fade

slide

soft scale

parallax subtle

micro-confirmations

number roll animations

state transitions

Never:

bounce

rubberband

cheap flashy motion

spinners everywhere

Motion should whisper.

Not shout.

---

# 2.11 LAYOUT DOCTRINE

Max width: 1440–1600px

Comfort zones: 1280px

Mobile first:

360+ responsive

Tablet: 768+

Desktop: 1024+

Wide: 1440+

Ultra-wide: optimize dashboards

---

Use:

cards

modular panes

side rails

context drawers

floating command bar

smart tabs

Never:

crowded mega menus

heavy nav clutter

dashboard chaos

---

# 2.12 ACCESSIBILITY

Mandatory:

WCAG AA+

high contrast mode

keyboard navigation

screen reader labels

reduced motion mode

font scaling

touch targets \>= 44px

clear error states

visible focus states

Accessibility \= trust.

---

# 2.13 DESIGN SYSTEM OUTPUT

Opencode MUST build:

Cuboid Design System:

tokens/ components/ patterns/ layouts/ icons/ motion/ charts/ form-kit/ data-grid/ mobile-kit/

Storybook mandatory.

Shared web \+ mobile tokens mandatory.

Single source of truth mandatory.

---

# END SECTION 2

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume I — Core Build Doctrine

### Section 3 — UX/UI Architecture Doctrine

**Instruction Type:** Experience Architecture Directive  
**Applies To:** Product Design, UX Research, Frontend Engineering, Mobile Engineering, Accessibility, Product Management  
**Directive Status:** Non-Negotiable  
**Authoring Institution:** Insane Technologies  
**Design Intent:** Complex Infrastructure, Effortless Experience

---

# 3.0 CORE UX PHILOSOPHY

Cuboid handles:

- trust,  
- compliance,  
- routing,  
- FX,  
- settlement,  
- liquidity,  
- treasury,  
- reconciliation,  
- dispute,  
- institutional coordination.

This is inherently complex.

Users must never feel that complexity.

The central UX doctrine:

**Expose clarity. Hide machinery. Reveal depth progressively.**

This is mandatory.

Users should feel:

- calm,  
- informed,  
- in control,  
- protected,  
- guided,  
- confident.

Never overwhelmed.

Never confused.

Never blind.

Never trapped in process loops.

Never wondering:

"What is happening to my money?"

Visibility creates trust.

Transparency creates calm.

Control creates loyalty.

---

# 3.1 EXPERIENCE PRINCIPLES

All product surfaces must obey:

## Principle 1 — Clarity Over Cleverness

No clever UI tricks.

No hidden controls.

No cryptic labels.

No jargon-heavy workflows.

Every action obvious.

Every state understandable.

Every next step clear.

Institutional simplicity.

---

## Principle 2 — Intent-Based UX

Do not force users through product silos.

Users think in goals:

- send money  
- receive money  
- convert currency  
- pay supplier  
- collect payment  
- settle invoice  
- hold funds  
- release escrow  
- verify counterparty  
- resolve dispute  
- reconcile books  
- monitor treasury

Design around intent.

Not around internal module boundaries.

Modules stay backend concepts.

Experience stays unified.

---

## Principle 3 — Progressive Disclosure

Default \= simple.

Advanced \= expandable.

Expert \= powerful.

Three layers:

### Surface Layer

Simple, elegant, guided.

---

### Power Layer

Advanced controls.

---

### Institutional Layer

Deep analytics / workflow / governance.

---

Never dump complexity immediately.

Reveal sophistication progressively.

---

## Principle 4 — Explain System Decisions

When Cuboid chooses:

- route  
- rate  
- settlement path  
- hold threshold  
- review flag  
- verification requirement

system must explain:

WHY.

Examples:

"Fastest route selected"

"Lower fee partner selected"

"Enhanced verification required"

"Funds held pending confirmation"

"Settlement delayed due to receiving bank cutoff"

Explain clearly.

Trust requires explanation.

---

## Principle 5 — Confidence Through Feedback

Every major action must confirm:

accepted  
processing  
held  
verifying  
settling  
completed  
failed  
reversed  
disputed  
refunded

Never silent state.

Never uncertainty.

Always visible state.

---

# 3.2 GLOBAL INFORMATION ARCHITECTURE

Cuboid platform architecture:

## Layer A — Public Surface

Marketing / education / trust / onboarding

---

## Layer B — User Operating Layer

Retail / SME / merchant / treasury experience

---

## Layer C — Institutional Layer

Enterprise / partner / compliance / treasury / regulator

---

## Layer D — Internal Operations Layer

Admin / risk / support / dispute / fraud / controls

---

All share one design system.

Different depth.

Same language.

---

# 3.3 PRIMARY NAVIGATION MODEL

Navigation must be universal.

Simple.

Persistent.

Elegant.

---

## Web Navigation

Top floating glass nav:

Logo left

Center:

- Products  
- Solutions  
- Rates  
- Security  
- Developers  
- Learn

Right:

- Sign in  
- Create account

CTA: Launch Cuboid

Sticky smart nav.

---

## Authenticated Web App

Left intelligent rail:

Home  
Move Value  
Wallets  
Treasury  
Payments  
Trade  
Escrow  
Contacts  
Analytics  
Compliance  
Support  
Settings

Bottom: Profile / notifications / theme / command palette

---

## Mobile

Bottom nav:

Home  
Move  
Activity  
Trust  
Profile

Floating action: New Transaction

Hidden: deep modules via command drawer

Do not overcrowd mobile tabs.

---

# 3.4 COMMAND-CENTER UX

Cuboid should feel operationally intelligent.

Build command layer:

Universal command palette:

shortcut: CMD/CTRL \+ K

Capabilities:

search users  
search transactions  
search partners  
search corridors  
search disputes  
search rates  
create transaction  
create invoice  
open escrow  
release funds  
freeze account  
export report  
contact support

Natural language acceptable later.

Command layer becomes productivity moat.

Mandatory.

---

# 3.5 DASHBOARD DOCTRINE

Dashboards must answer:

What happened?  
What matters?  
What needs action?  
What is next?

---

Dashboard zones:

## Zone 1 — Snapshot

Balances / trust / velocity / alerts

---

## Zone 2 — Action

Primary CTAs

---

## Zone 3 — Activity

Recent movement

---

## Zone 4 — Insights

Rates / corridor intelligence / trends

---

## Zone 5 — Governance

Compliance / holds / disputes / alerts

---

## Zone 6 — Recommendations

Smart next actions

---

Never dashboard clutter.

One clear story.

---

# 3.6 TRANSACTION UX MODEL

Every movement uses transaction workspace.

Stages:

Intent → Verification → Quote → Confirmation → Funding → Routing → Settlement → Reconciliation → Completion

Visualized as timeline rail.

Always visible.

Status chips clear.

Timeline interactive.

Audit visible.

Transparency mandatory.

---

Transaction details page:

overview  
timeline  
fees  
route  
counterparty  
documents  
compliance  
audit  
messages  
support

Institutional depth.

Consumer simplicity.

---

# 3.7 TRUST UX

Trust must be visible.

Build trust surfaces:

Identity verified badges

Partner reliability score

Settlement reliability score

Risk warnings

Fraud warnings

Execution confidence meter

Escrow state

Compliance state

Dispute protection indicators

Never gamify trust.

Keep serious.

Measured.

Professional.

---

# 3.8 ONBOARDING UX

Onboarding should feel premium concierge.

Not paperwork torture.

Flow:

Welcome  
Purpose selection  
Account type  
Identity  
Verification  
Funding setup  
Counterparty setup  
First transaction walkthrough

Progress visible.

Save progress.

Resume later.

Clear ETA.

Document upload elegant.

Verification status visible.

---

For business:

KYB workspace.

Team invites.

Permissions.

Treasury setup.

Approval matrix.

Beneficiaries.

Settlement preferences.

---

# 3.9 ERROR UX

Failure is trust moment.

Error system:

What happened

Why

What next

Expected timeline

Support path

Reference ID

No vague:

"Something went wrong."

Ban that phrase.

Forever.

---

# 3.10 NOTIFICATION UX

Notifications categorized:

Action required

FYI

Security

Compliance

Settlement

Partner

Dispute

Treasury

Alerts

Channels:

in-app  
push  
email  
SMS optional  
WhatsApp optional  
webhook optional

Digest options.

Priority engine.

Silent hours.

Smart escalation.

---

# 3.11 SUPPORT UX

Support is integrated.

Not bolt-on.

In-product:

chat

ticket

call-back request

document exchange

dispute center

resolution timeline

assigned case owner

SLA timer visible

Trust through service.

---

# 3.12 DATA VISUALIZATION

Charts:

clean

minimal

serious

interactive

Use:

flow maps

corridor heatmaps

rate curves

treasury views

settlement aging

trust analytics

fraud clusters

partner scorecards

Never decorative junk charts.

Only meaningful visuals.

---

# 3.13 MOBILE UX PRINCIPLES

One-thumb operation.

Fast actions.

Offline draft transaction.

Resume flows.

Biometric auth.

Low-data mode.

Network resilience.

Compressed payloads.

Graceful retry.

Android-first optimization.

Nigeria-first connectivity assumptions.

---

# 3.14 ACCESS MODEL

Every role sees contextual product.

Retail sees simplicity.

Treasury sees power.

Admin sees control.

Regulator sees visibility.

Partner sees integration ops.

One platform.

Role-aware surfaces.

---

# 3.15 DESIGN OUTPUTS REQUIRED

Opencode MUST produce:

wireframes  
high-fidelity UI  
interaction specs  
motion specs  
prototype flows  
mobile prototypes  
component states  
empty states  
loading states  
error states  
success states  
notification states  
support states  
compliance states

Full UX system.

Not mockups.

System.

---

# END SECTION 3

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume I — Core Build Doctrine

### Section 4 — Product Information Architecture & Module Map

**Instruction Type:** Platform Architecture Mapping Directive  
**Applies To:** Product Architecture, Backend Engineering, Frontend Engineering, Mobile Engineering, Data Engineering, DevOps, QA, Security, Compliance Engineering  
**Directive Status:** Non-Negotiable  
**Authoring Institution:** Insane Technologies  
**Architecture Intent:** One Unified Platform, Many Deployable Modules

---

# 4.0 CORE PRODUCT ARCHITECTURE PRINCIPLE

Opencode MUST build Cuboid as:

**one integrated economic operating platform** composed of **multiple independently deployable modules**

NOT separate apps.

NOT disconnected codebases.

NOT duplicated auth systems.

NOT duplicated ledgers.

NOT duplicated compliance engines.

NOT duplicated notification stacks.

NOT duplicated analytics.

One platform.

One truth layer.

One trust layer.

One control plane.

Many modular surfaces.

---

# 4.1 PLATFORM ARCHITECTURE LAYERS

Cuboid consists of 7 major layers:

---

## Layer 1 — Experience Layer

Customer-facing interfaces.

Includes:

Web App  
Mobile App  
Admin App  
Partner Portal  
Regulator Portal  
Developer Portal  
Marketing Site

This layer only consumes APIs.

No business logic duplication.

Thin clients.

---

## Layer 2 — Experience Orchestration Layer

Controls:

UI state orchestration  
workflow orchestration  
session orchestration  
feature flags  
notifications  
context routing  
assistant guidance  
smart recommendations

Acts as UX intelligence layer.

---

## Layer 3 — Business Capability Layer

Core modules:

Cuboid Connect  
Cuboid FX  
Cuboid Treasury  
Cuboid Pay  
Cuboid Trade  
Cuboid Identity  
Cuboid Capital  
Cuboid Escrow  
Cuboid Compliance  
Cuboid Analytics  
Cuboid Support  
Cuboid Network

Modules expose services.

Modules interact via events.

Loose coupling mandatory.

---

## Layer 4 — Core Infrastructure Layer

Contains:

Ledger Engine  
Trust Engine  
Risk Engine  
Pricing Engine  
Routing Engine  
Reconciliation Engine  
Workflow Engine  
Document Engine  
Notification Engine  
Search Engine  
Audit Engine  
Observability Engine  
Rules Engine

This is Cuboid's machine room.

---

## Layer 5 — Partner Abstraction Layer

Normalizes:

banks  
IMTOs  
BDCs  
switches  
liquidity desks  
payment processors  
identity providers  
compliance vendors  
insurers  
trade rails  
escrow institutions

All external rails abstracted.

No direct module-to-partner hard coding.

Mandatory adapters only.

---

## Layer 6 — Data Intelligence Layer

Contains:

analytics warehouse  
fraud graph  
trust graph  
behavior graph  
corridor intelligence  
liquidity intelligence  
pricing intelligence  
forecasting engine  
ML feature store  
reporting marts

This becomes moat.

---

## Layer 7 — Platform Foundation Layer

Contains:

cloud infra  
networking  
IAM  
secrets  
CI/CD  
containers  
Kubernetes  
service mesh  
queues  
DBs  
caching  
storage  
DR systems  
backup  
security stack

Operational base.

---

# 4.2 PRIMARY PRODUCT SURFACES

Build 7 deployable surfaces.

---

## Surface A — Public Marketing Platform

Purpose:

education  
trust building  
onboarding  
developer docs  
partner onboarding  
pricing visibility  
thought leadership

Pages:

Home  
About  
Products  
Solutions  
Industries  
Developers  
Security  
Compliance  
Rates  
Pricing  
Resources  
Blog  
FAQ  
Help Center  
Partner With Us  
Investor Relations  
Contact  
Status Page

Capabilities:

CMS  
SEO  
content engine  
newsletter  
webinars  
lead forms  
chatbot  
knowledge center

---

## Surface B — Cuboid Web Application

Primary operating application.

Contains:

dashboard  
transactions  
wallets  
contacts  
rates  
beneficiaries  
escrow  
documents  
analytics  
support  
settings

Advanced modules exposed progressively.

Role aware.

---

## Surface C — React Native Android Application

Must mirror core web capabilities:

dashboard  
send  
receive  
convert  
hold  
release  
activity  
notifications  
trust center  
support  
settings

Android first.

Offline support.

Biometric login.

Push engine.

Low bandwidth mode.

Background sync.

---

## Surface D — Partner Portal

For integrated partners.

Capabilities:

API credentials  
webhooks  
settlement reports  
liquidity reports  
performance scorecards  
incident center  
reconciliation  
documentation  
sandbox  
partner compliance uploads  
ticketing

Partner ops hub.

---

## Surface E — Enterprise Treasury Portal

For businesses.

Capabilities:

multi-user access  
approvals  
treasury dashboard  
payables  
receivables  
FX booking  
liquidity planning  
invoices  
bulk payouts  
ERP integration  
accounting export  
counterparty registry  
risk view

Institutional-grade.

---

## Surface F — Regulator Portal

Restricted visibility.

Capabilities:

approved audit access  
SAR review  
license reporting  
compliance dashboards  
transaction summaries  
risk indicators  
case requests  
regulatory exports

Read governed.

Permission controlled.

Highly audited.

---

## Surface G — Internal Control Tower

Cuboid operational brain.

Capabilities:

global ops  
partner health  
liquidity heatmap  
fraud watch  
compliance queue  
trust alerts  
support operations  
reconciliation queue  
incident center  
pricing control  
feature flags  
system control  
release control

War room quality.

---

# 4.3 BUSINESS MODULES

Each module deployable independently.

Each module consumes shared platform.

---

## Module 1 — Cuboid Connect

Purpose:

trusted movement of money.

Features:

send  
receive  
beneficiaries  
corridor routing  
fee transparency  
status timeline  
scheduled transfers  
bulk transfer  
proof of transfer  
retry handling  
returns handling

APIs mandatory.

---

## Module 2 — Cuboid FX

Purpose:

currency conversion intelligence.

Features:

live rates  
locked quotes  
forward quotes later  
spread engine  
partner pricing  
liquidity discovery  
book execution  
hedge visibility later  
FX analytics

Core monetization module.

---

## Module 3 — Cuboid Treasury

Purpose:

business operating money layer.

Features:

accounts  
cash positions  
liquidity visibility  
payables  
receivables  
approval workflows  
FX booking  
cash forecasting  
multi-entity treasury

---

## Module 4 — Cuboid Pay

Purpose:

collection \+ disbursement rails.

Features:

payment links  
checkout  
merchant tools  
subscriptions  
invoice pay  
bulk payout  
SDKs  
embedded payouts

---

## Module 5 — Cuboid Trade

Purpose:

trade movement infrastructure.

Features:

invoice settlement  
trade docs  
escrow trade  
shipment milestone releases  
counterparty assurance  
trade audit trail

---

## Module 6 — Cuboid Identity

Purpose:

trust infrastructure.

Features:

KYC  
KYB  
identity graph  
device graph  
trust score  
counterparty trust  
fraud detection  
document vault

Mandatory backbone.

---

## Module 7 — Cuboid Capital

Purpose:

financial enablement.

Future:

credit rails  
invoice financing  
working capital  
embedded liquidity  
risk-based pricing

Build hooks now.

Deploy later.

---

## Module 8 — Cuboid Escrow

Purpose:

conditional settlement.

Features:

hold funds  
conditions  
release rules  
arbitration  
document evidence  
milestone release  
partial release  
reversal

Massive trust wedge.

---

## Module 9 — Cuboid Compliance

Purpose:

operational compliance OS.

Features:

cases  
screening  
monitoring  
filings  
alerts  
analyst review  
audit exports

---

## Module 10 — Cuboid Analytics

Purpose:

economic intelligence.

Features:

dashboards  
forecasting  
trust analytics  
corridor analytics  
liquidity analytics  
partner analytics

---

## Module 11 — Cuboid Support

Purpose:

resolution architecture.

Features:

tickets  
chat  
case ownership  
SLA  
disputes  
document exchange  
escalation

---

## Module 12 — Cuboid Network

Purpose:

ecosystem intelligence \+ orchestration.

Contains:

routing  
partner graph  
liquidity graph  
trust graph  
optimization

Cuboid moat engine.

---

# 4.4 SHARED CROSS-CUTTING SERVICES

All modules consume:

Auth  
IAM  
RBAC  
ABAC  
Ledger  
Notifications  
Documents  
Audit  
Search  
Workflow  
Rules  
Feature flags  
Analytics  
Monitoring  
Localization  
Billing  
Webhooks  
SDK engine

Never rebuild locally.

---

# 4.5 FEATURE FLAGS

Every capability feature-flagged.

By:

country  
license  
role  
partner  
beta group  
device  
risk class

Modular launch enabled.

---

# 4.6 MULTI-TENANCY

Build multi-tenant by default.

Tenant types:

retail  
business  
partner  
regulator  
internal

Tenant isolation mandatory.

Data partitioning mandatory.

Tenant config engine mandatory.

---

# 4.7 OUTPUT REQUIRED FROM OPENCODE

Generate:

full sitemap  
screen map  
route map  
component map  
entity map  
service map  
API map  
workflow map  
permissions matrix  
event map  
database model  
mobile navigation map  
admin navigation map  
partner navigation map

Everything mapped before coding.

No blind build.

---

# END SECTION 4

\# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

\#\# Volume I — Core Build Doctrine

\#\#\# Section 5 — User Roles, Access Control & Permission Matrix

\*\*Instruction Type:\*\* Identity, Access & Governance Directive  

\*\*Applies To:\*\* Backend Engineering, Security Engineering, Product Architecture, Frontend Engineering, Mobile Engineering, DevOps, Compliance Engineering  

\*\*Directive Status:\*\* Non-Negotiable  

\*\*Authoring Institution:\*\* Insane Technologies

\---

\# 5.0 CORE ACCESS PRINCIPLE

Opencode MUST build Cuboid as:

\> \*\*identity-centric, policy-driven, zero-trust access infrastructure\*\*

NOT simple login roles.

NOT flat permission tables.

NOT admin/non-admin logic.

NOT hardcoded permission checks.

Cuboid requires:

RBAC \+ ABAC \+ Policy Engine \+ Contextual Access Controls.

Mandatory.

Every request evaluated.

Every action governed.

Every permission auditable.

\---

\# 5.1 IDENTITY MODEL

Build identity hierarchy:

PlatformIdentity  

├── IndividualIdentity  

├── BusinessIdentity  

├── InstitutionalIdentity  

├── PartnerIdentity  

├── RegulatorIdentity  

└── InternalOperatorIdentity

Each identity contains:

UUID  

Legal Name  

Display Name  

Country  

Residency  

Identity Tier  

Verification Tier  

Trust Score  

Risk Score  

Device Registry  

Document Vault  

Linked Accounts  

Linked Organizations  

Compliance State  

Fraud State  

Sanctions State  

Audit Trail

Immutable identity backbone.

\---

\# 5.2 ROLE CLASSES

\#\#\# Retail Roles

Guest  

Registered User  

Verified User  

Premium User  

High Value User

\---

\#\#\# Business Roles

Business Owner  

Finance Lead  

Treasury Operator  

Accounts Payable  

Accounts Receivable  

Approver  

Viewer  

Auditor

\---

\#\#\# Enterprise Roles

Treasury Admin  

Treasury Analyst  

Approver Tier 1  

Approver Tier 2  

Compliance Officer  

Risk Officer  

Controller  

CFO  

Read Only Executive

\---

\#\#\# Partner Roles

Partner Admin  

Settlement Ops  

Liquidity Desk  

Compliance Desk  

Support Desk  

Technical Admin  

Audit Officer

\---

\#\#\# Regulator Roles

Read Observer  

Case Analyst  

Supervisor  

Audit Controller

Strict least privilege.

\---

\#\#\# Internal Roles

Founder Admin  

Platform Admin  

Operations Admin  

Compliance Analyst  

Risk Analyst  

Fraud Analyst  

Settlement Ops  

Treasury Ops  

Support Ops  

Partner Ops  

Engineering Admin  

Security Admin  

Finance Admin  

Audit Admin

No superuser shortcuts.

\---

\# 5.3 PERMISSION MODEL

Permission format:

resource.action.scope

Examples:

transaction.create.own  

transaction.view.organization  

transaction.approve.tier2  

wallet.view.assigned  

wallet.freeze.internal  

escrow.release.approved  

compliance.review.case  

audit.export.regulator  

partner.reconcile.assigned  

risk.override.limited

Granular.

Composable.

Auditable.

\---

\# 5.4 AUTHENTICATION

Mandatory:

Email OTP  

Authenticator App MFA  

SMS fallback  

Biometric mobile login  

Device binding  

Session signing  

Hardware key support later  

Passkeys roadmap

Adaptive auth:

higher risk \= stronger challenge

Context-aware auth.

\---

\# 5.5 POLICY ENGINE

All access evaluated by policy engine.

Inputs:

role  

trust score  

risk score  

country  

tenant  

device trust  

time  

transaction size  

regulatory class  

approval matrix

Decision:

allow  

allow with condition  

step-up auth  

queue review  

deny

Policy as code.

Versioned.

Audited.

\---

\# 5.6 APPROVAL WORKFLOWS

Support:

single approval  

multi approval  

tiered approval  

parallel approval  

threshold approval  

country-specific approval  

role-based approval

Enterprise-grade.

\---

\# 5.7 SESSION MODEL

Short lived access tokens.

Refresh rotation.

Device registry.

Geo anomaly detection.

Concurrent session control.

Session revocation.

Audit logs.

\---

\# 5.8 OUTPUT REQUIRED

Generate:

permission matrix  

policy engine  

auth flows  

session service  

device trust service  

approval engine  

identity graph

Mandatory before feature coding.

\---

\# END SECTION 5

\# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

\#\# Volume II — Product Surfaces

\#\#\# Section 6 — Marketing Platform Build Specification

\*\*Instruction Type:\*\* Public Trust, Education & Acquisition Platform Directive  

\*\*Applies To:\*\* Frontend, UX, Content Systems, SEO, Analytics, Growth Engineering  

\*\*Directive Status:\*\* Non-Negotiable  

\*\*Authoring Institution:\*\* Insane Technologies

\---

\# 6.0 CORE PURPOSE

Marketing site is NOT brochureware.

Marketing site is:

trust engine  

education engine  

partner acquisition engine  

developer onboarding engine  

brand institution engine  

lead generation engine

Must feel:

premium  

serious  

clear  

global-class  

African-rooted  

institutional

\---

\# 6.1 TECH STACK

Build with:

Next.js (latest App Router)  

TypeScript strict  

TailwindCSS  

Framer Motion  

shadcn/ui base primitives  

Glassmorphism design tokens  

MDX content engine  

Headless CMS  

i18n-ready  

SEO-first  

Edge caching

SSR \+ ISR hybrid.

Lightning fast.

\---

\# 6.2 PAGE ARCHITECTURE

Build:

Home  

About Cuboid  

Manifesto  

Products  

Solutions  

Industries  

Developers  

Security & Trust  

Compliance  

Rates & Corridors  

Pricing  

Resources  

Knowledge Center  

Blog  

Case Studies  

Partner With Cuboid  

Investor Relations  

Careers  

Press  

Contact  

Status Page  

Legal Center

Every page production-ready.

Not placeholders.

\---

\# 6.3 HOME PAGE

Must feel iconic.

Sections:

Hero  

Trust metrics  

How Cuboid works  

Product ecosystem  

Why trust Cuboid  

Corridor map  

Partner ecosystem  

Developer CTA  

Enterprise CTA  

Testimonials later  

Thought leadership  

Newsletter  

Footer mega-nav

Hero CTA:

Launch Cuboid  

Talk to Sales  

Partner With Us

Premium animated cube motif.

Subtle.

\---

\# 6.4 SECURITY PAGE

Institutional trust page.

Explain:

encryption  

MFA  

fraud systems  

trust engine  

escrow  

audit trails  

compliance architecture  

incident response  

uptime architecture

Must be world-class.

Security sells trust.

\---

\# 6.5 DEVELOPERS

Dedicated portal:

API docs  

SDKs  

Sandbox  

Quick starts  

Webhooks  

Rate limits  

Status  

Changelog  

Examples

Developer-first.

Stripe-level clarity target.

\---

\# 6.6 CONTENT ENGINE

CMS collections:

articles  

research  

guides  

newsletters  

reports  

corridor insights  

compliance updates  

partner spotlights

Editorial workflow.

Scheduling.

SEO schema.

Search.

Tagging.

\---

\# 6.7 LEAD ENGINE

Forms:

sales  

partner  

developer  

enterprise  

media  

investor

CRM integration hooks.

Lead scoring.

Attribution tracking.

Conversion funnels.

\---

\# 6.8 ANALYTICS

Track:

visits  

funnels  

CTA conversion  

developer signups  

partner applications  

country demand  

content engagement  

heatmaps  

retention

Privacy aware.

Consent managed.

\---

\# 6.9 TRUST UX

Live widgets:

platform uptime  

settlement stats  

supported corridors  

security notices  

compliance badges  

partner logos  

live rates teaser

Trust surfaces everywhere.

\---

\# 6.10 OUTPUT REQUIRED

Generate:

full sitemap  

wireframes  

high fidelity pages  

CMS schema  

SEO architecture  

analytics events  

lead funnels  

developer docs shell

Production ready.

\---

\# END SECTION 6

### Self-critique

Strong: ✓ Access architecture now institutional-grade ✓ Marketing site defined as acquisition \+ trust infrastructure ✓ Consistent with prior doctrine ✓ Gives Opencode executable clarity

Next batch:

# **Section 7 — Web App Build Specification**

\+\#

# **Section 8 — Internal Admin Control Tower**

This is where Cuboid starts becoming a real operating machine.

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume II — Product Surfaces

### Section 7 — Web Application Build Specification

**Instruction Type:** Core Operating Platform Directive  
**Applies To:** Frontend Engineering, Backend Engineering, Product Design, Mobile Sync Engineering, Security Engineering, QA  
**Directive Status:** Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 7.0 CORE PURPOSE

The Cuboid Web Application is the primary operating interface for:

- individuals,  
- SMEs,  
- merchants,  
- enterprise treasury teams,  
- institutional users.

It is NOT merely dashboard software.

It is:

**economic operations software**

The application must feel:

- premium,  
- calm,  
- deeply capable,  
- trustworthy,  
- intelligent,  
- operationally serious.

Think:

consumer simplicity \+ institutional depth.

---

# 7.1 PLATFORM FRAMEWORK

Build:

Next.js latest App Router  
TypeScript strict  
TailwindCSS  
Framer Motion  
React Query / TanStack Query  
Zustand light client state  
Server Actions where appropriate  
WebSocket live streams  
Realtime notification bus  
Offline draft caching  
PWA support  
Accessibility AA+

All interfaces consume API gateway.

No direct DB logic.

Thin client.

---

# 7.2 AUTH EXPERIENCE

Pages:

Sign In  
Create Account  
Magic Link  
OTP  
MFA  
Biometric (webauthn)  
Password Recovery  
Session Management  
Device Management

Enterprise:

SSO  
SAML  
OIDC

Trust center visible during auth.

Device trust score shown.

Session audit visible.

---

# 7.3 CORE APP SHELL

Persistent shell:

Left navigation rail  
Top context bar  
Universal command palette  
Smart notifications  
Context drawer  
Global search  
Quick action FAB (context aware)  
Profile rail  
Support entry  
Theme switcher

Responsive.

Elegant.

Fast.

---

# 7.4 DASHBOARD EXPERIENCE

Dashboard must be role aware.

Retail:

balances  
recent transfers  
rate snapshot  
beneficiaries  
trust status  
quick send  
recent receipts  
support status

---

Business:

cash position  
pending approvals  
payables  
receivables  
FX exposure  
liquidity  
risk alerts  
team activity

---

Enterprise:

multi-entity treasury  
approvals  
corridor activity  
settlement health  
liquidity planning  
compliance queue  
partner status  
analytics

---

# 7.5 TRANSACTIONS MODULE

Build:

Create transfer  
Create payout  
Bulk upload  
Templates  
Recurring transactions  
Beneficiary save  
Draft save  
Scheduled transfer  
Route comparison  
Fee transparency  
Expected settlement ETA  
Funding method selection  
Proof of payment upload  
Document attach  
Notes  
Approval routing  
Status timeline  
Retry  
Return handling  
Dispute open

Deep filters.

Export.

Audit trail.

---

# 7.6 WALLET / ACCOUNT MODULE

Capabilities:

multi-currency wallets  
wallet statements  
virtual account mapping later  
holds  
escrow holds  
reserved funds  
available balance  
pending settlement  
transaction drilldown  
download statements  
linked bank accounts  
fund sources

Immutable ledger-backed.

---

# 7.7 FX MODULE

Capabilities:

live quotes  
compare providers  
locked quote timer  
convert flow  
forward booking placeholder hooks  
historical rates  
spread explanation  
slippage explanation  
rate alerts  
favorite corridors  
institutional booking

Explain pricing clearly.

No black-box rates.

---

# 7.8 ESCROW MODULE

Capabilities:

create escrow  
set release conditions  
document milestones  
multi-party approvals  
partial release  
full release  
arbitration trigger  
evidence vault  
communication thread  
status rail  
audit timeline

Escrow UX must feel premium and secure.

Major trust wedge.

---

# 7.9 CONTACTS & COUNTERPARTIES

Capabilities:

beneficiaries  
business counterparties  
trust badges  
verification state  
favorites  
counterparty analytics  
history  
document exchange  
notes  
risk warnings

Counterparty registry becomes asset.

---

# 7.10 DOCUMENT CENTER

Vault:

IDs  
KYB docs  
contracts  
proofs  
invoices  
settlement docs  
receipts  
escrow docs  
audit exports

OCR hooks.

Classification.

Versioning.

Permissions.

Encryption mandatory.

---

# 7.11 COMPLIANCE CENTER

Visible where relevant:

verification state  
required actions  
submitted docs  
case status  
screening notices  
limits  
transaction holds  
review requests

Transparent.

Clear.

Guided.

---

# 7.12 ANALYTICS CENTER

Retail:

spending / receipts / rates

Business:

cash flow / corridor / partner / fees

Enterprise:

liquidity / exposure / velocity / treasury intelligence

Charts must be actionable.

---

# 7.13 SUPPORT CENTER

Integrated:

chat  
ticket  
document exchange  
resolution tracking  
assigned owner  
SLA countdown  
call request  
dispute center

Never external feeling.

---

# 7.14 SETTINGS

Profile  
Security  
Devices  
Notifications  
Limits  
Approvals  
Users  
Billing  
Integrations  
API keys  
Webhooks  
Localization

Institutional depth.

---

# 7.15 OUTPUT REQUIRED

Generate:

full route tree  
all screens  
state diagrams  
interaction specs  
component inventory  
API bindings  
test scenarios

Production-grade.

---

# END SECTION 7

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume II — Product Surfaces

### Section 9 — Partner Portal Build Specification

**Instruction Type:** Ecosystem Integration & Partner Operations Directive  
**Applies To:** Frontend Engineering, Backend Engineering, API Engineering, Partner Success, Compliance Engineering, Security Engineering  
**Directive Status:** Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 9.0 CORE PURPOSE

Build Cuboid Partner Portal as:

**the operating cockpit for institutions connected to Cuboid rails**

Partners include:

- banks  
- licensed fintechs  
- IMTOs  
- switches  
- payment processors  
- BDCs  
- liquidity desks  
- identity providers  
- compliance vendors  
- insurers  
- treasury partners  
- trade infrastructure partners

Portal purpose:

- onboarding  
- integration  
- credentialing  
- settlement operations  
- reconciliation  
- reporting  
- compliance collaboration  
- incident handling  
- performance visibility  
- commercial governance

Partners must feel:

“Cuboid is serious institutional infrastructure.”

---

# 9.1 TECH STACK

Build:

Next.js latest  
TypeScript strict  
TailwindCSS  
Glassmorphism institutional shell  
WebSocket event streams  
Realtime reconciliation feeds  
Webhook simulator  
OpenAPI explorer  
SDK console  
Audit logs  
Secure document vault

SSO capable.

Tenant isolated.

---

# 9.2 PARTNER ONBOARDING

Build onboarding workspace:

company profile  
license documentation  
jurisdiction setup  
regulatory approvals upload  
capability declaration  
API readiness assessment  
security review checklist  
sandbox access issuance  
commercial agreement workflow  
technical certification  
go-live readiness checklist

State machine:

Applied  
Reviewing  
Due Diligence  
Technical Validation  
Compliance Validation  
Approved  
Sandbox Active  
Production Limited  
Production Full  
Restricted  
Suspended

---

# 9.3 PARTNER PROFILE

Store:

legal name  
license details  
supported corridors  
supported currencies  
supported methods  
SLAs  
fees  
contacts  
technical endpoints  
keys  
certificates  
limits  
risk rating  
trust score  
incident history  
performance score

Versioned.

Audited.

---

# 9.4 API & DEVELOPER CENTER

Capabilities:

API key issuance  
OAuth client management  
Webhook registration  
Webhook signing secrets  
Webhook replay  
Sandbox credentials  
Environment config  
Rate limits dashboard  
SDK downloads  
API usage analytics  
Request logs  
Response logs  
Error logs  
Mock payloads  
Certification suite

Partner DX must be excellent.

---

# 9.5 SETTLEMENT OPERATIONS

View:

incoming instructions  
outgoing settlements  
holds  
failed settlements  
returns  
reserve assignments  
partner balances  
liquidity position  
fees earned  
fees payable  
pending reconciliation  
exceptions queue

Realtime visibility.

---

# 9.6 RECONCILIATION CENTER

Capabilities:

daily reconciliation  
intraday reconciliation  
break detection  
variance reports  
manual adjustments workflow  
evidence attach  
approval chain  
export CSV/XLSX/API  
ledger mapping  
statement matching

No spreadsheet chaos.

Structured workflows only.

---

# 9.7 COMPLIANCE DESK

Capabilities:

KYC/KYB collaboration requests  
document uploads  
screening responses  
SAR coordination  
audit requests  
regulatory correspondence  
policy attestation  
compliance scoring  
breach notices  
remediation tracking

All time-stamped.

---

# 9.8 INCIDENT DESK

Partners can:

report outage  
report degraded service  
report suspicious activity  
request corridor pause  
trigger emergency contact  
attach logs  
view incident timeline  
join coordinated response room

Shared response rails.

---

# 9.9 PERFORMANCE CENTER

Metrics:

success rate  
latency  
reliability  
reversal rate  
complaint rate  
liquidity adequacy  
compliance responsiveness  
pricing competitiveness  
incident frequency  
settlement quality

Partner score visible.

Score impacts routing.

Transparency mandatory.

---

# 9.10 COMMERCIAL CENTER

View:

contracts  
pricing schedules  
invoices  
fee settlements  
revenue share  
reserve requirements  
commercial notices

Institutional relationship hub.

---

# 9.11 OUTPUT REQUIRED

Generate:

partner IA  
partner APIs  
partner lifecycle workflows  
settlement workflows  
reconciliation workflows  
partner compliance workflows  
incident workflows

Production-grade.

---

# END SECTION 9

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume II — Product Surfaces

### Section 11 — React Native Android Application Build Specification

**Instruction Type:** Mobile Operating Surface Directive  
**Applies To:** Mobile Engineering, Backend Engineering, Product Design, Security Engineering, QA, DevOps  
**Directive Status:** Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 11.0 CORE PURPOSE

Build Cuboid Mobile as:

**the trusted pocket operating system for movement of value**

Not a stripped-down companion app.

Not a lightweight dashboard wrapper.

Not web shoved into mobile.

This is native-feeling operational software.

Android-first.

Nigeria-first.

Africa-first.

Low bandwidth resilient.

High trust.

Fast.

Elegant.

Operationally deep.

---

# 11.1 STACK

Build with:

React Native latest stable  
TypeScript strict  
RN CLI preferred (Expo modules optional)  
Native bridges only where needed  
TanStack Query  
Zustand  
React Navigation  
Native secure storage  
Biometric auth  
Push notifications  
Background sync  
Offline queue  
Crash reporting  
Deep links  
Feature flags  
OTA updates

Use Android Studio for:

emulation  
profiling  
native debugging  
release packaging

Core code remains RN.

Shared design tokens with web mandatory.

---

# 11.2 CORE MOBILE UX

Bottom nav:

Home  
Move  
Activity  
Trust  
Profile

Floating primary action:

New Transaction

Hidden command drawer:

Wallets  
Escrow  
Rates  
Beneficiaries  
Analytics  
Support  
Settings  
Documents

One-thumb usage optimized.

44px+ touch minimum.

Fast transitions.

Low cognitive load.

---

# 11.3 AUTH

Capabilities:

OTP  
Passwordless  
Biometric login  
Device trust registration  
Passcode fallback  
Session management  
Trusted device list  
Remote revoke  
Adaptive auth challenge

Security visible.

Trust-first.

---

# 11.4 HOME

Display:

balances  
quick send  
recent activity  
rates snapshot  
escrow snapshot  
trust score  
alerts  
approvals pending  
partner updates  
support status

Widget based.

Personalized.

---

# 11.5 MOVE FLOW

Create:

send  
receive request  
convert  
escrow  
pay merchant  
pay supplier  
bulk upload later  
scheduled transfer

Flow:

intent → verify → quote → confirm → fund → settle → track

Timeline visible.

Simple.

Transparent.

---

# 11.6 ACTIVITY

Capabilities:

filter  
search  
status drilldown  
receipt share  
proof download  
raise dispute  
contact support  
audit summary  
timeline

Realtime updates.

---

# 11.7 TRUST CENTER

Display:

identity status  
verification state  
device trust  
counterparty trust  
risk notices  
security alerts  
session activity  
permissions  
linked devices

Trust becomes visible asset.

---

# 11.8 OFFLINE-FIRST

Support:

draft transaction offline  
cache beneficiaries  
cache rates snapshot  
queue uploads  
resume workflows  
retry sync intelligently

Graceful network recovery.

Mandatory.

---

# 11.9 PERFORMANCE

Target:

cold launch \<2.5s  
warm launch \<1.2s  
low memory footprint  
optimized lists  
image compression  
lazy modules  
network compression

Nigeria bandwidth assumptions.

---

# 11.10 OUTPUT REQUIRED

Generate:

full mobile IA  
all screens  
interaction specs  
offline model  
sync engine  
push engine  
biometric flows  
deep links

Production-grade.

---

# END SECTION 11

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume III — Platform Core

### Section 14 — Trust Engine Architecture

**Instruction Type:** Programmable Trust Infrastructure Directive  
**Applies To:** Backend Engineering, Data Engineering, Fraud Engineering, Risk Engineering, Product Engineering, Compliance Engineering  
**Directive Status:** Strategic Moat / Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 14.0 CORE PRINCIPLE

Build Trust Engine as:

**software that computes confidence**

Trust is measurable.

Trust is dynamic.

Trust is contextual.

Trust affects routing, pricing, speed, limits, scrutiny, and partner selection.

Trust becomes Cuboid moat.

---

# 14.1 TRUST DOMAINS

Compute:

Identity Trust  
Device Trust  
Behavior Trust  
Counterparty Trust  
Partner Trust  
Corridor Trust  
Settlement Trust  
Compliance Trust  
Document Trust  
Network Trust

Composite Trust Score built from layers.

Explainable scoring mandatory.

No black box.

---

# 14.2 IDENTITY TRUST

Signals:

verification depth  
document authenticity  
historical consistency  
linked identity graph  
sanctions exposure  
PEP exposure  
duplicate risk  
verification freshness

Score continuously.

Decay where appropriate.

---

# 14.3 DEVICE TRUST

Signals:

device fingerprint  
rooted device detection  
emulator detection  
SIM swap indicators  
location consistency  
session behavior  
device age  
device reputation  
linked fraud rings

Realtime updates.

---

# 14.4 BEHAVIOR TRUST

Signals:

velocity  
frequency  
amount variance  
corridor change  
new counterparty risk  
time anomaly  
behavior drift  
interaction anomaly

Behavior graph mandatory.

---

# 14.5 COUNTERPARTY TRUST

Signals:

payment history  
disputes  
delivery confirmation  
fraud reports  
settlement reliability  
identity confidence  
network endorsements

Trust graph becomes asset.

---

# 14.6 PARTNER TRUST

Score partners on:

uptime  
latency  
failure rate  
reversal rate  
liquidity adequacy  
compliance responsiveness  
complaints  
incident history  
pricing fairness

Routing influenced by trust.

---

# 14.7 CORRIDOR TRUST

Compute:

settlement reliability  
regulatory friction  
fraud exposure  
liquidity stability  
seasonality risk  
partner diversity

Corridor intelligence moat.

---

# 14.8 TRUST ACTIONS

Trust score influences:

limits  
approval need  
settlement path  
instant settlement eligibility  
escrow requirements  
pricing spreads  
fraud review  
partner selection  
reserve requirements

Programmable trust.

---

# 14.9 EXPLAINABILITY

System must explain:

why trust score changed

why review triggered

why hold applied

why route selected

Transparency mandatory.

---

# 14.10 OUTPUT REQUIRED

Generate:

trust graph  
signal ingestion  
scoring engine  
decision rules  
explainability engine  
feedback loop

Strategic moat.

---

# END SECTION 14

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume III — Platform Core

### Section 16 — Quote / FX Engine Architecture

**Instruction Type:** Pricing, Conversion & Corridor Intelligence Directive  
**Applies To:** Backend Engineering, Treasury Engineering, Data Engineering, Partner Ops, Product Engineering  
**Directive Status:** Strategic Revenue Engine / Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 16.0 CORE PRINCIPLE

Build Cuboid FX Engine as:

**intelligent corridor pricing and execution infrastructure**

Not simple rate lookup.

Not static markup engine.

Not opaque spread business.

This is:

pricing intelligence  
execution intelligence  
liquidity intelligence  
partner routing intelligence  
customer trust engine

Core monetization wedge.

---

# 16.1 QUOTE ENGINE

Generate quotes using:

partner quotes  
liquidity books  
internal pricing rules  
trust score modifiers  
volume discounts  
time-of-day spreads  
corridor volatility  
reserve requirements  
compliance cost  
partner trust score

Quote \= intelligent product.

---

# 16.2 QUOTE MODEL

Store:

quote\_id  
source partners  
base rate  
spread  
fees  
taxes if applicable  
lock duration  
liquidity reservation  
confidence score  
route candidate list  
expected settlement ETA  
risk premium  
reasoning summary

Transparent.

Explainable.

Auditable.

---

# 16.3 RATE SOURCES

Connect:

banks  
licensed IMTOs  
FX desks  
BDCs where compliant  
market feeds  
internal treasury reserves

Normalize into pricing bus.

---

# 16.4 ROUTING INTELLIGENCE

Select route using:

best price  
best reliability  
best trust  
best speed  
best compliance fit  
best liquidity fit

Weighted routing engine.

Explain route choice.

---

# 16.5 LOCKED QUOTES

Support:

15 sec  
30 sec  
60 sec  
custom institutional windows

Reserve liquidity where needed.

Expiry handling mandatory.

Requote flow mandatory.

---

# 16.6 CUSTOMER FAIRNESS

Display clearly:

rate  
spread  
fees  
delivery estimate  
why selected

No hidden spread abuse.

Trust-first pricing.

---

# 16.7 TREASURY VIEW

Internal views:

corridor demand  
spread profitability  
partner competitiveness  
liquidity stress  
rate volatility  
exposure  
quote conversion rate

Commercial intelligence layer.

---

# 16.8 ALERTS

Enable:

target rate alerts  
corridor movement alerts  
partner outage repricing  
liquidity stress alerts

Realtime.

---

# 16.9 FUTURE CAPABILITIES

Hooks for:

forwards  
hedging  
scheduled conversions  
institutional RFQ  
smart treasury execution

Architect now.

Deploy later.

---

# 16.10 OUTPUT REQUIRED

Generate:

pricing engine  
routing engine  
quote lifecycle  
partner price adapters  
liquidity reservation engine  
treasury analytics

Strategic moat.

---

# END SECTION 16

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume III — Platform Core

### Section 18 — Notification / Messaging Engine Architecture

**Instruction Type:** Communication Infrastructure Directive  
**Applies To:** Backend Engineering, Mobile Engineering, Frontend Engineering, Product Engineering, Support Engineering, DevOps  
**Directive Status:** Critical / Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 18.0 CORE PRINCIPLE

Build Cuboid Notifications as:

**event-driven trust communication infrastructure**

Messaging is not cosmetic.

Messaging reduces uncertainty.

Uncertainty destroys trust.

Therefore:

communication \= infrastructure.

Mandatory.

---

# 18.1 CHANNELS

Support:

In-app notifications  
Push notifications  
Email  
SMS  
WhatsApp (where appropriate)  
Webhook callbacks  
Slack / Teams enterprise hooks later  
Voice callback workflow later

Channel abstraction mandatory.

---

# 18.2 EVENT SOURCES

Trigger notifications from:

identity events  
verification events  
quote events  
funding events  
settlement events  
escrow events  
compliance events  
fraud alerts  
security events  
support events  
partner events  
regulatory notices  
system incidents

Everything event-driven.

No manual spaghetti triggers.

---

# 18.3 MESSAGE TYPES

Categories:

Action Required  
Confirmation  
Warning  
Alert  
Security  
Compliance  
Settlement  
Escrow  
Support  
Partner  
Regulatory  
Marketing (strictly separated)

Transactional messages isolated from promotional.

Never mix.

Trust-first.

---

# 18.4 TEMPLATE ENGINE

Support:

variables  
localisation  
rich formatting  
PDF attachment  
document links  
secure links  
signed links  
expiry links  
approval CTA  
deep links into app

Templates versioned.

Audited.

Previewable.

---

# 18.5 PREFERENCE CENTER

Users control:

channel preferences  
quiet hours  
language  
digest frequency  
security override rules  
critical alert routing

Critical security alerts may override silence.

Policy based.

---

# 18.6 DELIVERY ENGINE

Capabilities:

channel failover  
delivery receipts  
bounce handling  
retry orchestration  
provider routing  
cost optimization  
priority queues  
rate limiting  
spam protection

Institutional messaging reliability.

---

# 18.7 CONVERSATION LAYER

Build secure threaded conversations:

support threads  
escrow threads  
compliance requests  
document exchange  
case communications  
partner coordination  
regulator notices

Attachments encrypted.

Retention governed.

Audit preserved.

---

# 18.8 INCIDENT COMMUNICATION

System status messaging:

degraded service  
partner outage  
corridor pause  
maintenance  
incident resolution  
compensation notices

Transparent operational communication.

Trust through honesty.

---

# 18.9 ANALYTICS

Track:

delivery rate  
open rate  
engagement  
resolution speed  
support response  
notification fatigue  
critical acknowledgement

Optimization engine later.

---

# 18.10 OUTPUT REQUIRED

Generate:

notification bus  
template engine  
channel adapters  
delivery workflows  
preference engine  
conversation service  
incident communication flows

Infrastructure-grade.

---

# END SECTION 18

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume IV — Delivery & Operations

### Section 19 — GitHub Monorepo & Code Architecture

**Instruction Type:** Engineering Operating System Directive  
**Applies To:** Platform Engineering, Frontend Engineering, Backend Engineering, Mobile Engineering, DevOps, QA, Security Engineering  
**Directive Status:** Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 19.0 CORE PRINCIPLE

Build Cuboid codebase as:

**one institutional platform, many deployable products**

Single source of truth.

Modular deployability.

Shared standards.

Shared tooling.

Independent releases.

No code duplication madness.

No scattered repos chaos.

No copy-paste mobile/web divergence.

Monorepo mandatory.

---

# 19.1 REPOSITORY MODEL

Build:

cuboid-platform/

apps/  
├── web-marketing/  
├── web-app/  
├── admin-tower/  
├── partner-portal/  
├── regulator-portal/  
├── mobile-android/  
├── docs-portal/  
└── internal-tools/

services/  
├── identity-service/  
├── auth-service/  
├── policy-service/  
├── wallet-service/  
├── ledger-service/  
├── transaction-service/  
├── quote-service/  
├── pricing-service/  
├── settlement-service/  
├── escrow-service/  
├── compliance-service/  
├── trust-service/  
├── fraud-service/  
├── risk-service/  
├── notification-service/  
├── document-service/  
├── workflow-service/  
├── partner-adapter-service/  
├── audit-service/  
├── analytics-service/  
├── billing-service/  
└── support-service/

packages/  
├── design-system/  
├── ui-primitives/  
├── tokens/  
├── api-sdk/  
├── auth-sdk/  
├── analytics-sdk/  
├── event-contracts/  
├── schemas/  
├── testing-kit/  
├── observability-kit/  
├── security-kit/  
└── config/

infra/  
├── kubernetes/  
├── terraform/  
├── helm/  
├── secrets/  
├── networking/  
└── environments/

docs/  
tools/  
scripts/

Clean.

Predictable.

Scalable.

---

# 19.2 TOOLING

Use:

Turborepo  
pnpm workspace  
Nx optional for orchestration layer  
Changesets  
Biome / ESLint  
Prettier  
Husky hooks  
Commitlint  
Semantic versioning  
OpenAPI generation  
Proto generation

Automate discipline.

---

# 19.3 SHARED DESIGN SYSTEM

One source:

Cuboid Design System

Includes:

colors  
glass tokens  
spacing  
radius  
icons  
charts  
motion  
typography  
states  
dark mode  
accessibility tokens

Web \+ mobile parity.

No UI drift.

---

# 19.4 SHARED BUSINESS PACKAGES

Shared packages:

trust logic contracts  
validation schemas  
permission contracts  
API client  
feature flags  
analytics instrumentation  
error models  
localisation  
crypto utilities

Reduce duplicate logic.

---

# 19.5 SERVICE TEMPLATE

Every service generated from template:

src/  
tests/  
Dockerfile  
helm chart  
health checks  
metrics endpoint  
trace hooks  
config validation  
README  
runbook

Consistency mandatory.

---

# 19.6 BRANCH STRATEGY

Protected:

main → production truth

release/\* → controlled release

develop → integration

feature/\* → isolated work

hotfix/\* → emergency

CODEOWNERS mandatory.

Approvals mandatory.

---

# 19.7 VERSIONING

Version:

apps  
services  
SDKs  
contracts  
schemas

Backward compatibility discipline.

Deprecation policy mandatory.

---

# 19.8 DOCUMENTATION

Every module includes:

purpose  
architecture  
API docs  
events  
failure modes  
security notes  
runbook  
owner team

No undocumented systems.

---

# 19.9 OUTPUT REQUIRED

Generate:

monorepo scaffold  
workspace config  
service templates  
shared packages  
design system package  
release policy  
code ownership policy

Institutional engineering.

---

# END SECTION 19

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume IV — Delivery & Operations

### Section 22 — Security Hardening & Zero Trust Infrastructure

**Instruction Type:** Platform Security Doctrine Directive  
**Applies To:** Security Engineering, Platform Engineering, Backend Engineering, Frontend Engineering, Mobile Engineering, DevOps, Compliance Engineering  
**Directive Status:** Critical / Absolute Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 22.0 CORE PRINCIPLE

Build Cuboid security as:

**zero trust institutional defense architecture**

Never trust:

user  
device  
network  
session  
service  
partner callback  
internal admin  
vendor  
code artifact

Everything verified.

Continuously.

---

# 22.1 SECURITY LAYERS

Build:

identity security  
session security  
network security  
application security  
service security  
data security  
partner integration security  
infrastructure security  
operator security  
supply chain security

Defense in depth.

Mandatory.

---

# 22.2 IDENTITY SECURITY

Enforce:

adaptive MFA  
passkeys roadmap  
device binding  
behavioral authentication  
session anomaly detection  
step-up auth  
credential stuffing defense  
rate limiting  
bot mitigation

Trust is earned continuously.

---

# 22.3 API SECURITY

Mandatory:

OAuth2/OIDC  
signed requests  
idempotency keys  
request validation  
schema validation  
mTLS internal  
WAF external  
API abuse detection  
replay protection  
nonce verification  
IP intelligence

Every endpoint hardened.

---

# 22.4 DATA SECURITY

Encrypt:

at rest  
in transit  
in backup  
in queues  
in documents  
in logs where sensitive

Tokenize:

account identifiers  
PII  
sensitive docs

Field-level encryption for critical records.

---

# 22.5 SECRETS

Vault managed:

partner keys  
certs  
DB creds  
JWT signing keys  
webhook secrets  
SMS credentials  
mail credentials

Rotation policy:

automatic \+ emergency

Access audited.

Never leakable.

---

# 22.6 PARTNER CALLBACK SECURITY

Require:

signed webhooks  
timestamp verification  
replay prevention  
schema validation  
IP validation  
certificate pinning where feasible  
callback quarantine on anomaly

Partner trust ≠ blind trust.

---

# 22.7 INTERNAL OPERATOR SECURITY

Mandatory:

least privilege  
approval chains  
privileged session recording  
just-in-time access  
break-glass access  
reason logging  
sensitive action approvals  
periodic entitlement review

Admins are high-risk actors too.

Institutional honesty.

---

# 22.8 MOBILE SECURITY

Enforce:

secure keystore  
certificate pinning  
root detection  
emulator detection  
debug block in prod  
secure screenshots policy  
clipboard controls  
tamper detection  
runtime integrity checks

Android-first hardening.

---

# 22.9 THREAT DETECTION

Build:

SIEM ingestion  
behavior anomaly detection  
fraud graph hooks  
credential anomaly detection  
partner anomaly detection  
data exfiltration alerts  
privilege escalation alerts  
impossible travel alerts

Continuous watchtower.

---

# 22.10 INCIDENT RESPONSE

Capabilities:

detect  
classify  
contain  
revoke  
rotate secrets  
freeze routes  
freeze identities  
forensic preserve  
notify  
recover  
postmortem

Runbooks mandatory.

Tabletop exercises mandatory.

---

# 22.11 SUPPLY CHAIN SECURITY

Enforce:

artifact signing  
SBOM  
dependency policy  
license policy  
container scanning  
image provenance  
CI hardening  
secret scanning  
build attestation

Trust the build chain.

---

# 22.12 OUTPUT REQUIRED

Generate:

security architecture  
control matrix  
threat model  
incident runbooks  
hardening checklist  
security test suite

Institutional-grade.

---

# END SECTION 22

# CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE

## Volume IV — Delivery & Operations

### Section 25 — Rollout Doctrine \+ Master Integration Notes

**Instruction Type:** Strategic Build & Launch Doctrine  
**Applies To:** Founders, Product, Engineering, Compliance, Operations, Partners, Investors  
**Directive Status:** Foundational / Non-Negotiable  
**Authoring Institution:** Insane Technologies

---

# 25.0 HARD TRUTH

Cuboid is too large to launch whole.

Trying to launch everything:

kills focus  
kills capital  
kills execution  
kills trust

Therefore:

**Architect full-stack. Deploy modular. Compound intelligently.**

That is doctrine.

Exactly your instinct.

Correct.

---

# 25.1 PHASE 1 — CUBOID CONNECT

Launch wedge:

Cross-border send / receive orchestration.

Capabilities:

identity  
wallet  
quote  
partner routing  
settlement  
notifications  
compliance  
admin tower

Target:

diaspora  
SMEs  
merchant imports  
B2B settlement

Fastest market wedge.

Revenue quickly visible.

Trust graph starts building.

---

# 25.2 PHASE 2 — CUBOID ESCROW

Launch trust wedge:

trade escrow  
milestone escrow  
merchant escrow  
delivery escrow

Massive African pain point solved.

Huge moat.

Underserved.

---

# 25.3 PHASE 3 — CUBOID FX

Launch treasury wedge:

conversion  
locked quotes  
rate intelligence  
partner routing  
liquidity optimization

Margin engine.

---

# 25.4 PHASE 4 — CUBOID PAY

Merchant rails:

checkout  
merchant collections  
supplier payouts  
bulk payroll  
embedded rails

Network expansion.

---

# 25.5 PHASE 5 — CUBOID TRADE

Trade layer:

invoice rails  
purchase order finance hooks  
trade docs  
escrowized trade settlement  
counterparty trust graph

Continental moat.

---

# 25.6 PHASE 6 — CUBOID CAPITAL

Financial layer:

working capital  
merchant credit  
invoice finance  
risk-based capital rails

Only after trust graph matures.

Never earlier.

---

# 25.7 CORE KPI NORTH STAR

Measure:

trust growth  
partner density  
corridor depth  
settlement speed  
failure reduction  
cost reduction  
compliance efficiency  
customer retention  
network effects

Not vanity installs.

---

# 25.8 MASTER INTEGRATION NOTE TO OPENCODE

Build everything as:

modular  
event-driven  
ledger-first  
trust-first  
policy-first  
partner-native  
API-first  
mobile-ready  
country-configurable  
institutional-grade

UI:

deep trust blues from Cuboid logo

Use:

glassmorphism  
high whitespace  
soft shadow  
institutional typography  
calm motion  
clear hierarchy  
premium seriousness

Think:

Stripe × Wise × Mercury × Palantir discipline  
built for Africa.

---

# 25.9 FINAL INSTITUTIONAL NOTE

Cuboid is not an app.

Cuboid is:

**economic trust infrastructure**

Build accordingly.

No shortcuts.

No duct tape.

No startup sloppiness.

Institution first.

Scale second.

Trust always.

---

**END MASTER BUILD INSTRUCTION**

**Signed,**  
**Insane Technologies**  
