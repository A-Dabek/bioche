import {FirebaseUser} from '@/interface/firebase-user';

export class FirestoreUserService {
  private snapshotToUser(
    snapshot: firebase.firestore.DocumentSnapshot
  ): FirebaseUser | null {
    const user = snapshot.data();
    if (user) return { name: snapshot.id, ...user } as FirebaseUser;
    else return null;
  }

  private snapshotToUserArray(
    snapshot: firebase.firestore.QuerySnapshot
  ): FirebaseUser[] {
    const temp = [] as FirebaseUser[];
    snapshot.forEach(q => temp.push({ ...(q.data() as FirebaseUser), name: q.id }));
    return temp;
  }

  listenToUserChanges(
    userName: string,
    onSnapshot: (users: FirebaseUser | null) => void
  ): () => void {
    return this.db
      .collection('users')
      .doc(userName)
      .onSnapshot(query => onSnapshot(this.snapshotToUser(query)));
  }

  setUser(user: Partial<FirebaseUser> & { name: string }): Promise<void> {
    return this.db
      .collection('users')
      .doc(user.name)
      .set(user);
  }

  updateUser(user: Partial<FirebaseUser> & { name: string }): Promise<void> {
    return this.db
      .collection('users')
      .doc(user.name)
      .update(user);
  }

  getUser(name: string): Promise<FirebaseUser | null> {
    return this.db
      .collection('users')
      .doc(name)
      .get()
      .then(snapshot => this.snapshotToUser(snapshot));
  }

  getChallengingMeUsers(
    userName: string,
    callback: (user: FirebaseUser[]) => void
  ): () => void {
    return this.db
      .collection('users')
      .where('challenging', '==', userName)
      .onSnapshot(snapshot => callback(this.snapshotToUserArray(snapshot)));
  }

  getAvailableUsers(callback: (user: FirebaseUser[]) => void): () => void {
    return this.db
      .collection('users')
      .where('challenging', '==', '')
      .onSnapshot(snapshot => callback(this.snapshotToUserArray(snapshot)));
  }

  constructor(private db: firebase.firestore.Firestore) {}
}
