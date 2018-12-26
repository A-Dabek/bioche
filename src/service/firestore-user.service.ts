import { User } from '@/interface/user';
import { __makeTemplateObject } from 'tslib';

export class FirestoreUserService {
  private snapshotToUser(
    snapshot: firebase.firestore.DocumentSnapshot
  ): User | null {
    const user = snapshot.data();
    if (user) return { name: snapshot.id, ...user } as User;
    else return null;
  }

  private snapshotToUserArray(
    snapshot: firebase.firestore.QuerySnapshot
  ): User[] {
    const temp = [] as User[];
    snapshot.forEach(q => temp.push({ ...(q.data() as User), name: q.id }));
    return temp;
  }

  listenToUserChanges(
    userName: string,
    onSnapshot: (users: User | null) => void
  ): () => void {
    return this.db
      .collection('users')
      .doc(userName)
      .onSnapshot(query => onSnapshot(this.snapshotToUser(query)));
  }

  setUser(user: Partial<User> & { name: string }): Promise<void> {
    return this.db
      .collection('users')
      .doc(user.name)
      .set(user);
  }

  updateUser(user: Partial<User> & { name: string }): Promise<void> {
    return this.db
      .collection('users')
      .doc(user.name)
      .update(user);
  }

  getUser(name: string): Promise<User | null> {
    return this.db
      .collection('users')
      .doc(name)
      .get()
      .then(snapshot => this.snapshotToUser(snapshot));
  }

  getChallengingMeUsers(
    userName: string,
    callback: (user: User[]) => void
  ): () => void {
    return this.db
      .collection('users')
      .where('challenging', '==', userName)
      .onSnapshot(snapshot => callback(this.snapshotToUserArray(snapshot)));
  }

  getAvailableUsers(callback: (user: User[]) => void): () => void {
    return this.db
      .collection('users')
      .where('challenging', '==', '')
      .onSnapshot(snapshot => callback(this.snapshotToUserArray(snapshot)));
  }

  constructor(private db: firebase.firestore.Firestore) {}
}
