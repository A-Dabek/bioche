import { Icon } from '@/interface/icon';

export class FirestoreIconService {
  startLibrary(): Promise<{ [k: string]: Icon }> {
    return this.db
      .collection('library')
      .get()
      .then(query => {
        const library = {} as any;
        query.forEach(q => (library[q.id] = { ...q.data() }));
        return library;
      });
  }

  constructor(private db: firebase.firestore.Firestore) {}
}
