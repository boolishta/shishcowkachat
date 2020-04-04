import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}
export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}
export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}
export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}
export function signOut() {
  console.log("sign out")
  return auth().signOut();
}
export function passwordReset(email) {
  return auth().sendPasswordResetEmail(email);
}
export function passwordUpdate(password) {
  return auth().currentUser.updatePassword(password);
}
export function updateName(name) {
  return auth().currentUser.updateProfile({displayName: name})
}