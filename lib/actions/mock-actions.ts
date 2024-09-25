"use server";

import { FETCH } from "@/constants/UI/fetch_messages";
const { SUCCESS } = FETCH;

export async function mockAction(name: string) {
  const mockRes = { ok: true, message: `mock ${name} ok` };
  return mockRes;
}
