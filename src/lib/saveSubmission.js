import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase.js";

const FIRESTORE_TIMEOUT_MS = 12000;

export async function saveSubmission(collectionName, payload) {
  if (!firebaseEnabled) return { saved: false, reason: "firebase-not-configured" };

  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error("firestore-timeout")),
      FIRESTORE_TIMEOUT_MS
    );
  });

  const write = addDoc(collection(db, collectionName), {
    ...payload,
    createdAt: serverTimestamp(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
  });

  try {
    const ref = await Promise.race([write, timeout]);
    clearTimeout(timeoutId);
    return { saved: true, id: ref.id };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("[saveSubmission] non-fatal:", err?.message || err);
    return { saved: false, reason: err?.message || "unknown" };
  }
}
