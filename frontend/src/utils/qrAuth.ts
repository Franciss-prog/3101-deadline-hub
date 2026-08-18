import { jwtDecode } from "jwt-decode";
import { srCodeRegex } from "./auth";

export interface StudentQrPayload {
  srcode: string;
  fullname: string;
  timestamp: string;
  type: "STUDENT";
  userid: string;
}

/**
 * Decodes a scanned QR string as a JWT (payload only, no signature
 * verification) and validates it matches the expected student QR shape.
 * Returns the validated payload, or null if decode fails or the shape
 * doesn't match — callers should toast on null, never throw/crash.
 */
export const decodeStudentQr = (qrText: string): StudentQrPayload | null => {
  let decoded: unknown;
  try {
    decoded = jwtDecode(qrText);
  } catch {
    return null;
  }

  if (!decoded || typeof decoded !== "object") return null;
  const p = decoded as Record<string, unknown>;

  if (typeof p.srcode !== "string" || !srCodeRegex.test(p.srcode)) return null;
  if (typeof p.fullname !== "string" || p.fullname.trim() === "") return null;
  if (typeof p.timestamp !== "string" || p.timestamp.trim() === "") return null;
  if (p.type !== "STUDENT") return null;
  if (typeof p.userid !== "string" || p.userid.trim() === "") return null;

  return {
    srcode: p.srcode,
    fullname: p.fullname,
    timestamp: p.timestamp,
    type: "STUDENT",
    userid: p.userid,
  };
};
