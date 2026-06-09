import assert from "node:assert/strict";
import test from "node:test";

// Mirror core validation rules (keep in sync with lib/registration.ts)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body) {
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const teamName = body.teamName?.trim();
  const college = body.college?.trim();
  const teamSize = Number(body.teamSize);
  const members = body.members ?? [];

  if (!name) return { ok: false, message: "Team leader name is required." };
  if (!email || !EMAIL_REGEX.test(email))
    return { ok: false, message: "A valid team leader email is required." };
  if (!phone) return { ok: false, message: "Phone number is required." };
  if (!teamName) return { ok: false, message: "Team name is required." };
  if (!college) return { ok: false, message: "College / institution is required." };
  if (!Number.isInteger(teamSize) || teamSize < 1 || teamSize > 4)
    return { ok: false, message: "Team size must be between 1 and 4." };
  if (members.length !== teamSize)
    return {
      ok: false,
      message: "Member details must match the selected team size.",
    };
  return { ok: true };
}

test("rejects missing team leader name", () => {
  const result = validate({ email: "a@b.com", phone: "1", teamName: "T", college: "C", teamSize: 1, members: [{ name: "A", email: "a@b.com" }] });
  assert.equal(result.ok, false);
});

test("rejects invalid email", () => {
  const result = validate({
    name: "Leader",
    email: "bad",
    phone: "1",
    teamName: "T",
    college: "C",
    teamSize: 1,
    members: [{ name: "A", email: "a@b.com" }],
  });
  assert.equal(result.ok, false);
});

test("accepts valid single-member team", () => {
  const result = validate({
    name: "Leader",
    email: "leader@test.com",
    phone: "9800000000",
    teamName: "Hackers",
    college: "LEMSC",
    teamSize: 1,
    members: [{ name: "Leader", email: "leader@test.com" }],
  });
  assert.equal(result.ok, true);
});

test("rejects team size mismatch", () => {
  const result = validate({
    name: "Leader",
    email: "leader@test.com",
    phone: "9800000000",
    teamName: "Hackers",
    college: "LEMSC",
    teamSize: 2,
    members: [{ name: "Leader", email: "leader@test.com" }],
  });
  assert.equal(result.ok, false);
});
