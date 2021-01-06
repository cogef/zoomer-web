import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD1eCO6kk6eLGqNssnwSukt_sIVYKNPEE4',
  authDomain: 'zoomer-300722.firebaseapp.com',
  projectId: 'zoomer-300722',
  storageBucket: 'zoomer-300722.appspot.com',
  messagingSenderId: '237676702185',
  appId: '1:237676702185:web:66fade21207fac81de4378',
  measurementId: 'G-MBSJ8WP7F3',
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
