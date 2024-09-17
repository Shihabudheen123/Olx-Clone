import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFQQZD_EGB67KJ-QQa7B-vx0X4knf9Ru4",
    authDomain: "olx-clone-51c72.firebaseapp.com",
    projectId: "olx-clone-51c72",
    storageBucket: "olx-clone-51c72.appspot.com",
    messagingSenderId: "832387073188",
    appId: "1:832387073188:web:e1021ec2588cb54a851231",
    measurementId: "G-R128RF1XEC"
  };


 export default firebase.initializeApp(firebaseConfig)