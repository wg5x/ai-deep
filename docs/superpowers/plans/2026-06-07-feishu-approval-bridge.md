# Feishu Approval Bridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal Feishu application bot approval bridge for AI Life P0 confirmations.

**Architecture:** Keep channel-neutral approval logic in `runtime/approvals/` and Feishu-only integration in `runtime/adapters/feishu/`. The approval core formats messages, maps replies, and writes JSON decision records. The Feishu adapter sends messages through Feishu Open API and converts event callbacks into approval replies.

**Tech Stack:** Node.js ESM, Node built-in `node:test`, Node built-in `fetch`, local JSON files.

---

## Files

- Create `runtime/approvals/approvals.test.mjs` for channel-neutral approval tests.
- Create `runtime/approvals/protocol.mjs` and `runtime/approvals/store.mjs` for reusable approval logic.
- Create `runtime/adapters/feishu/channel.test.mjs` for Feishu channel tests.
- Create `runtime/adapters/feishu/channel.mjs` for Feishu event parsing and config validation.
- Create `runtime/adapters/feishu/send-approval.mjs` for Feishu message sending.
- Create `runtime/adapters/feishu/callback-server.mjs` for Feishu event callback handling.
- Create `runtime/adapters/feishu/README.md` for setup and safety notes.
- Create `data/approvals/README.md` and `data/approvals/pending/example-feishu-approval.json` for storage conventions.
- Modify `deploy/env.example` with Feishu variables.

## Tasks

- [x] Write failing core tests for message formatting, reply mapping, and JSON record persistence.
- [x] Run `node --test runtime/approvals/approvals.test.mjs runtime/adapters/feishu/channel.test.mjs` and verify failure.
- [x] Implement the minimal channel-neutral approval core.
- [x] Run the tests and verify they pass.
- [x] Add failing tests for Feishu event extraction and config validation.
- [x] Implement event extraction and config validation.
- [x] Add send and callback scripts.
- [x] Document setup, storage, and safety boundaries.
- [x] Split approval core from Feishu channel adapter to protect the Runtime architecture.
- [x] Add `send-approval --dry-run` for local preview without Feishu credentials.
- [x] Add a Feishu real-world setup checklist under `operations/`.
- [ ] Add production hardening later: Feishu Encrypt Key/signature verification, callback route mounting under API, and active approval correlation store.
