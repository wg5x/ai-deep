# Deep Research Language Kernel Design

> Date: 2026-06-07  
> Project: `ai-life`  
> Status: Draft v0, approved direction from discussion  
> Scope: Design spec for a reusable deep-research foundation. No implementation choices are locked here.

## 1. Core Thesis

This project should not start as an AI news tool, an agent framework, or a report generator.

It should start as a **Deep Research Language Kernel**: a stable set of documents that encode how we think, research, judge, decide, and improve.

The runtime can change. The model can change. The orchestration framework can change. The tool protocol can change.

The durable core is the language layer:

- principles
- methods
- protocols
- rubrics
- templates
- agent role definitions
- research workflows
- evidence standards
- output structures
- memory and feedback rules

In short:

```text
Runtime is replaceable.
Documents are the brain.
```

## 2. Why This Exists

Before building any future project, we need a reliable way to do deep research.

The first target domain may be AI industry intelligence, but the deeper goal is reusable project incubation. Every future project should be able to begin with a disciplined research run:

1. define the question
2. map sources
3. gather evidence
4. compare authoritative perspectives
5. form claims
6. test claims against contrary evidence
7. synthesize a report
8. produce a decision memo
9. capture feedback
10. improve the research kernel

The first full research run should therefore be a bootstrap exercise:

```text
Research Run #0:
Use human-agent collaboration to research how to build the Deep Research Language Kernel,
then extract the reusable methods, templates, rubrics, and workflows from that process.
```

This avoids pretending the system already exists. We manually perform the first high-quality run, then turn that run into the first version of the system.

## 3. Design Principles

### 3.1 Document-Native

The system's most important assets are documents, not code.

Documents must be written as executable language assets: clear enough for humans to review, structured enough for agent runtimes to interpret, and stable enough to survive runtime changes.

### 3.2 Runtime-Pluggable

The system must not be designed around one agent runtime.

Candidate runtimes may include:

- Codex-like human-agent workspace runtime
- OpenAI Agents SDK
- Claude Code / Claude Agent SDK
- Google ADK
- LangGraph
- AutoGen
- other future runtime environments

The project should define a runtime adapter boundary instead of hard-coding workflow logic into one framework.

### 3.3 Protocol-First

Tools, sources, and agent-to-agent interactions should be connected through protocols whenever possible.

Important protocol directions include:

- MCP for tool, resource, and context access
- A2A-style agent delegation when mature and useful
- RSS/API connectors for source intake
- trace/eval formats for repeatable review

### 3.4 Workflow Before Autonomy

The system should not make every step agentic.

Deterministic workflow is preferred for:

- research brief creation
- source category mapping
- evidence ledger structure
- report assembly
- artifact storage

Agent judgment is reserved for:

- identifying weak signals
- comparing competing interpretations
- generating hypotheses
- challenging claims
- synthesizing strategic implications
- proposing next actions

### 3.5 Trace As Memory

Every important conclusion must be traceable.

A high-quality report is not only a narrative. It must preserve:

- what sources were consulted
- what claims were made
- what evidence supports each claim
- what evidence weakens each claim
- what assumptions were used
- what uncertainty remains
- what changed after human feedback

Trace is not just debugging output. It is the raw material of institutional memory.

### 3.6 Human-In-The-Loop By Default

The system should help humans think better, not remove humans from judgment.

Human feedback must be part of the research loop:

- approve or reject research scope
- correct source priorities
- challenge claims
- adjust opportunity scores
- decide next actions
- update the language kernel after each run

### 3.7 Versioned And Upgradeable

The language kernel should be stable, but not frozen.

Because the durable core is made of documents, the system can propose upgrades to itself after each research run. These upgrades should be treated like changes to source code:

- versioned
- reviewed
- evaluated
- diffed
- reversible
- approved by a human before becoming canonical

The system may automatically propose changes to:

- research methods
- report templates
- scoring rubrics
- agent role instructions
- source quality rules
- memory update rules
- runtime adapter protocols

The system must not silently rewrite canonical documents.

An upgrade proposal is only valid when it includes:

- the document being changed
- the reason for the change
- evidence from a completed research run
- expected improvement
- possible risk
- compatibility impact on existing reports and runtimes
- rollback path

This makes the kernel self-improving without making it unstable.

### 3.8 Light Base, Deep Judgment

The codebase should stay light.

The project should avoid building heavy infrastructure early:

- no custom agent scheduler in v0
- no custom model abstraction in v0
- no complex UI in v0
- no vector database requirement in v0
- no graph database requirement in v0
- no multi-user platform in v0

The first version should rely on Markdown, JSON, and simple file conventions.

## 4. Conceptual Architecture

```text
┌──────────────────────────────────────────────┐
│ Deep Research Language Kernel                 │
│ principles / methods / protocols / rubrics    │
│ templates / agent roles / workflows / memory  │
└──────────────────────────────────────────────┘
                      │
                      v
┌──────────────────────────────────────────────┐
│ Runtime Adapter                               │
│ interprets kernel documents and executes work │
└──────────────────────────────────────────────┘
                      │
                      v
┌──────────────────────────────────────────────┐
│ External Runtime                              │
│ Codex / OpenAI Agents / Claude / ADK / etc.   │
└──────────────────────────────────────────────┘
                      │
                      v
┌──────────────────────────────────────────────┐
│ Tools And Protocols                           │
│ web / files / MCP / APIs / RSS / GitHub       │
└──────────────────────────────────────────────┘
                      │
                      v
┌──────────────────────────────────────────────┐
│ Research Artifacts                            │
│ briefs / ledgers / reports / memos / memory   │
└──────────────────────────────────────────────┘
```

The system should be understandable even if no code exists yet. The documents define the operating model; runtimes execute it.

## 5. Stable Kernel Documents

The kernel should be organized into a small number of document families.

### 5.1 Principles

Purpose: define the values and judgment rules that should influence every research run.

Initial documents:

- `principles/research-principles.md`
- `principles/source-integrity.md`
- `principles/opportunity-judgment.md`
- `principles/human-agent-collaboration.md`

These documents answer:

- What counts as good research?
- What makes a source trustworthy?
- How should we reason under uncertainty?
- When should the agent defer to the human?
- How do we avoid shallow consensus?

### 5.2 Methods

Purpose: define reusable research processes.

Initial documents:

- `methods/deep-research-process.md`
- `methods/source-mapping.md`
- `methods/evidence-analysis.md`
- `methods/claim-synthesis.md`
- `methods/red-team-review.md`
- `methods/decision-memo-process.md`
- `methods/post-run-retrospective.md`

These documents answer:

- What steps happen in a research run?
- How do we map source categories?
- How do we turn evidence into claims?
- How do we challenge our own interpretation?
- How does a report become a decision?
- How does each run improve the next run?

### 5.3 Protocols

Purpose: define the structured contracts that runtimes must follow.

Initial documents:

- `protocols/research-run-protocol.md`
- `protocols/runtime-adapter-protocol.md`
- `protocols/source-intake-protocol.md`
- `protocols/evidence-ledger-protocol.md`
- `protocols/feedback-protocol.md`
- `protocols/kernel-upgrade-protocol.md`

These documents answer:

- What is the lifecycle of a research run?
- What inputs must a runtime adapter accept?
- What artifacts must it produce?
- How are sources represented?
- How is human feedback captured?
- How are kernel document upgrades proposed, reviewed, accepted, or rejected?

### 5.4 Rubrics

Purpose: define scoring systems and review standards.

Initial documents:

- `rubrics/source-quality-rubric.md`
- `rubrics/evidence-strength-rubric.md`
- `rubrics/claim-confidence-rubric.md`
- `rubrics/report-quality-rubric.md`
- `rubrics/opportunity-scoring-rubric.md`
- `rubrics/kernel-change-rubric.md`

These documents answer:

- How reliable is this source?
- How strong is this evidence?
- How confident are we in this claim?
- Is the report useful for decision-making?
- Is this opportunity worth further investigation?
- Is a proposed kernel change justified, safe, and useful?

### 5.5 Templates

Purpose: define the shape of repeatable outputs.

Initial documents:

- `templates/research-brief.md`
- `templates/source-map.md`
- `templates/evidence-ledger.md`
- `templates/claim-graph.md`
- `templates/deep-report.md`
- `templates/decision-memo.md`
- `templates/watchlist.md`
- `templates/post-run-retro.md`

These documents answer:

- What does a research request look like?
- How do we list sources?
- How do we connect evidence to claims?
- How do we write the final report?
- How do we decide next actions?
- How do we track future signals?

### 5.6 Agent Role Documents

Purpose: define reusable research roles that can be interpreted by different runtimes.

Initial documents:

- `agents/researcher.md`
- `agents/source-critic.md`
- `agents/analyst.md`
- `agents/skeptic.md`
- `agents/strategist.md`
- `agents/editor.md`
- `agents/archivist.md`

These documents answer:

- What is this role responsible for?
- What tools may it use?
- What should it produce?
- What should it avoid?
- How does it hand work to another role?

### 5.7 Memory

Purpose: preserve what the system learns over time.

Initial documents and folders:

- `memory/decisions/`
- `memory/assumptions/`
- `memory/corrections/`
- `memory/reusable-insights/`
- `memory/source-notes/`
- `memory/kernel-changelog/`

These documents answer:

- What decisions have we made before?
- What assumptions were later corrected?
- Which sources proved useful or weak?
- What reusable insights emerged?
- What should future research runs remember?
- How has the language kernel evolved over time?

## 6. Runtime Model

The runtime should be treated as an interpreter of the language kernel.

Minimum runtime responsibilities:

1. load a research brief
2. load relevant kernel documents
3. execute a research workflow
4. call tools and sources
5. produce required artifacts
6. record trace and evidence
7. request human input at decision points
8. incorporate feedback into memory

The stable adapter interface is:

```text
RuntimeAdapter.run(task, kernel_documents, tools, memory) -> artifacts + trace + eval
```

This interface is conceptual in v0. It should guide future implementation without requiring an immediate software abstraction.

## 7. Candidate Runtime Strategy

### 7.1 Phase 0: HumanManualRuntime + Codex-Like Agent Workspace

Use the current human-agent workspace as the first runtime.

This is best for Research Run #0 because:

- the method is still being discovered
- human judgment is essential
- documents can be created and revised quickly
- source gathering can be interactive
- the process itself can be observed and extracted

### 7.2 Phase 1: OpenAI Agents SDK Adapter

Once the documents stabilize, experiment with an OpenAI Agents SDK adapter for repeatable tasks.

Candidate use cases:

- source intake
- evidence extraction
- first-pass report drafting
- role handoffs
- trace capture
- guardrail experiments

### 7.3 Phase 2: Alternative Runtime Adapters

After Phase 1, evaluate additional adapters only when there is a clear reason.

Candidate reasons:

- Claude Code / Claude Agent SDK for subagent-style research roles and file-native collaboration
- Google ADK for session/state/memory-oriented agent applications
- LangGraph for explicit long-running state machines
- AutoGen for multi-agent experimentation
- workflow systems such as Temporal or Inngest for durable scheduled runs

The project should not choose these early unless the current workflow proves the need.

## 8. Research Run Lifecycle

Every research run should follow the same lifecycle.

```text
1. Intake
   Define the question, context, audience, decision need, and deadline.

2. Scope
   Decide what is in scope, out of scope, and what would change the conclusion.

3. Source Map
   Identify source categories and prioritize primary sources.

4. Evidence Collection
   Gather sources and record them in an evidence ledger.

5. Claim Formation
   Turn evidence into explicit claims with confidence levels.

6. Skeptical Review
   Challenge claims, look for contrary evidence, and identify uncertainty.

7. Synthesis
   Produce the deep report.

8. Decision
   Produce a decision memo with recommended next actions.

9. Watchlist
   Define what should be tracked after the report.

10. Retrospective
    Capture what worked, what failed, and what should update the kernel.
```

## 9. Kernel Upgrade Lifecycle

The language kernel should improve through controlled upgrades.

Every research run may produce zero or more kernel upgrade proposals. A proposal should be created when the run reveals that an existing method, template, rubric, protocol, or agent role can be improved.

The upgrade lifecycle is:

```text
1. Detect
   Identify a repeated friction, quality failure, missing instruction, weak rubric, or reusable improvement.

2. Propose
   Create a kernel change proposal with rationale, evidence, target document, and expected benefit.

3. Diff
   Show the exact document change as a human-readable diff.

4. Evaluate
   Score the proposal with the kernel change rubric.

5. Simulate
   Check how the changed document would affect at least one prior or current research artifact.

6. Review
   Ask a human to accept, reject, or revise the proposal.

7. Apply
   If approved, update the canonical document.

8. Record
   Add an entry to the kernel changelog with date, reason, reviewer, and affected documents.

9. Roll Back
   If the change causes quality regression, revert it and record the reason.
```

Kernel upgrades should be conservative. A document change should improve repeatability, clarity, safety, or decision quality. It should not merely encode a one-off preference from a single run.

Automatic upgrade generation is allowed. Automatic upgrade application is not allowed in early versions.

## 10. Research Run #0

Research Run #0 should be the first concrete project.

Topic:

```text
How should we design a reusable Deep Research Language Kernel for future project incubation?
```

Expected external artifact:

- `reports/000-deep-research-language-kernel.md`

Expected internal artifacts:

- first research brief
- source map
- evidence ledger
- claim graph
- decision memo
- post-run retrospective
- first set of reusable templates
- first set of methods and rubrics

Success criteria:

- The report is useful enough to guide implementation.
- The process is explicit enough to repeat.
- The artifacts are structured enough for future runtime automation.
- The language kernel improves as a result of the run.

## 11. Relationship To AI Life

AI Life should be treated as the first major application domain, not the foundation itself.

The sequence should be:

```text
Deep Research Language Kernel
        ↓
Research Run #0 about the kernel itself
        ↓
AI Life research runs
        ↓
AI opportunity intelligence workflow
        ↓
future project incubation workflows
```

This preserves the more general asset while still allowing the AI domain to become the first practical proving ground.

## 12. Report Output Standard

A high-quality deep report must contain:

1. executive summary
2. research question
3. methodology
4. source map
5. key findings
6. evidence-backed claims
7. contrary evidence and uncertainty
8. strategic implications
9. opportunity areas
10. recommended next actions
11. watchlist
12. appendix with sources

A report without evidence trace is incomplete.

A report without decision implications is incomplete.

A report without uncertainty is incomplete.

A report without a post-run learning loop is incomplete.

## 13. Source Standards

Research should prefer primary and authoritative sources:

- official product documentation
- official engineering blogs
- published research papers
- standards and protocol documentation
- reputable company announcements
- source code and release notes
- credible journalism when primary sources are unavailable
- community discussion only as weak-signal input

Every source should be classified by:

- origin
- type
- date
- relevance
- reliability
- freshness
- claim supported
- limitations

## 14. Big AI Company Design Signals To Absorb

This project should continuously observe large AI company design patterns, but translate them into our own lightweight kernel.

Important signals:

- OpenAI: agent definitions, tool use, handoffs, guardrails, tracing, evals
- Anthropic: simple composable workflows, subagents, clear context boundaries, MCP orientation
- Google: session, state, memory, artifacts, evaluation, ADK-style runtime design
- Microsoft: build-contextualize-run-govern-improve platform lifecycle
- Meta: reusable skills, unified tooling, measurement, business-agent orientation

The lesson is not to copy any one company. The lesson is to separate:

```text
stable thinking assets
from
changing execution environments
```

## 15. Non-Goals

This spec does not propose:

- building a full agent platform immediately
- building a multi-user web app immediately
- choosing a permanent runtime immediately
- building a custom scheduler immediately
- requiring a vector database immediately
- requiring a graph database immediately
- automating all research steps immediately
- automatically applying kernel upgrades without review
- replacing human judgment

## 16. Initial Repository Shape

When implementation begins, the repository should start with documents before code:

```text
ai-life/
  principles/
  methods/
  protocols/
  rubrics/
  templates/
  agents/
  memory/
  upgrades/
  reports/
  runs/
  docs/
```

The early repository should be easy to read in a normal editor. A future runtime should be able to load these documents without needing a complex application.

## 17. Open Questions

These are intentional design questions for Research Run #0, not unresolved requirements:

1. Which report formats are most useful for decision-making: long report, decision memo, slide-style brief, or all three?
2. Which parts of deep research should remain human-led even after automation becomes possible?
3. What is the smallest useful evidence ledger schema?
4. How should we score opportunity quality without creating false precision?
5. What feedback loop best updates the language kernel after each run?
6. What is the minimum evidence required before a kernel upgrade proposal is worth reviewing?

## 18. Approval Criteria For This Design

This design is approved when we agree that:

- documents are the durable core
- runtime is replaceable
- Research Run #0 is the bootstrap path
- AI Life is the first application domain, not the root architecture
- early implementation should create language assets before code
- future automation should be driven by observed repeated workflow, not imagined upfront complexity
- kernel upgrades should be proposed automatically but applied only after human review

## 19. Reference Signals

These public references inform the direction and should be revisited during Research Run #0:

- OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk
- OpenAI agent evaluation guidance: https://platform.openai.com/docs/guides/evals
- Anthropic, Building Effective Agents: https://www.anthropic.com/engineering/building-effective-agents
- Claude Code subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Model Context Protocol: https://modelcontextprotocol.io/docs
- Google Agent Development Kit: https://google.github.io/adk-docs/
- Google ADK runtime: https://google.github.io/adk-docs/runtime/
- Microsoft Magentic-One: https://www.microsoft.com/en-us/research/articles/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/
