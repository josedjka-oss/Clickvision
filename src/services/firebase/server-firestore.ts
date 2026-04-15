import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseServerApp } from "@/services/firebase/server-app";

let serverDb: Firestore | null = null;

export const getServerFirestore = (): Firestore => {
  if (!serverDb) {
    serverDb = getFirestore(getFirebaseServerApp());
  }
  return serverDb;
};
