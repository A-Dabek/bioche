import { User } from '@/interface/user';

export class FirestoreUserService {
  listenToUserChanges(onSnapshot: (users: User[]) => void) {
    this.db.collection('users').onSnapshot(query => {
      const temp = [] as User[];
      query.forEach(q => temp.push({ ...(q.data() as User), name: q.id }));
      onSnapshot(temp);
    });
  }

  setUser(user: Partial<User>): Promise<void> {
    return this.db
      .collection('users')
      .doc(user.name)
      .set(user);
  }

  updateUser(user: Partial<User>): Promise<void> {
    return this.db
      .collection('users')
      .doc(user.name)
      .update(user);
  }

  constructor(private db: firebase.firestore.Firestore) {}
}
