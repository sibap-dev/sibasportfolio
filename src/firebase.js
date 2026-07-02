import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app = null
let db = null

try {
  const hasKeys = firebaseConfig.apiKey && firebaseConfig.projectId
  if (hasKeys) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  }
} catch {
  // Firebase not configured - fall back to hardcoded data
}

export async function fetchDoc(collectionName, docId = 'main') {
  if (!db) return null
  try {
    const snap = await getDoc(doc(db, collectionName, docId))
    return snap.exists() ? snap.data() : null
  } catch {
    return null
  }
}
