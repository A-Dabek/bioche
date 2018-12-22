import * as firebase from 'firebase/app';
import 'firebase/firestore';

export class FirestoreService {
  private static instance: FirestoreService;

  static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCI3eOUziHZCZxME8Q8OmFE_Tcj3DEMxfg',
        authDomain: 'icon-database.firebaseapp.com',
        databaseURL: 'https://icon-database.firebaseio.com',
        projectId: 'icon-database',
        storageBucket: 'icon-database.appspot.com',
        messagingSenderId: '969181801717'
      });
      FirestoreService.instance = new FirestoreService();
    }
    return FirestoreService.instance;
  }

  private db: firebase.firestore.Firestore;

  getDB() {
    return this.db;
  }

  private constructor() {
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
  }
}
