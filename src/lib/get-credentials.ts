import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getCredentials() {
  const querySnapshot = await getDocs(collection(db, "credentials"));
  const { client_id, client_secret, redirect_uri } =
    querySnapshot.docs[0].data();
  return { client_id, client_secret, redirect_uri };
}
