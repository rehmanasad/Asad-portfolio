import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase.js";

export async function saveSubmission(collectionName, payload) {
  if (!firebaseEnabled) return { saved: false, reason: "firebase-not-configured" };
  try {
    const ref = await addDoc(collection(db, collectionName), {
      ...payload,
      createdAt: serverTimestamp(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
    return { saved: true, id: ref.id };
  } catch (err) {
    console.error("[saveSubmission]", err);
    return { saved: false, reason: err?.message || "unknown" };
  }
}
