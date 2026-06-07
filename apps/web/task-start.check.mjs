import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync(new URL("./task-start.html", import.meta.url), "utf8");

const requiredText = [
  "任务启动",
  "阶段反馈",
  "沟通方式",
  "日常协作",
  "我需要给 AI 什么",
  "反馈节奏",
  "飞书或机器人",
  "确定，生成启动单",
  "启动单",
];

for (const text of requiredText) {
  assert.match(html, new RegExp(text), `Missing required text: ${text}`);
}

const requiredFields = [
  'name="resources"',
  'name="constraints"',
  'name="authorization"',
  'name="cadence"',
  'name="contact"',
  'name="cashGoal"',
  'name="routine"',
  'id="launchOutput"',
];

for (const field of requiredFields) {
  assert.ok(html.includes(field), `Missing required field: ${field}`);
}

assert.match(html, /function\s+buildLaunchBrief/, "Missing launch brief generator");
assert.match(html, /addEventListener\("submit"/, "Missing form submit handler");
assert.doesNotMatch(html, /<textarea\b/i, "Launch form should use choice controls, not textareas");
assert.doesNotMatch(html, /type="text"/i, "Launch form should use choice controls, not text inputs");

const choiceControlCount = (html.match(/type="(?:checkbox|radio)"/g) || []).length;
assert.ok(choiceControlCount >= 24, `Expected at least 24 choice controls, got ${choiceControlCount}`);

console.log("task-start page check passed");
