// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmrewQqSzygLgHYX56Xxu-NmCUHwpoCvI",
  authDomain: "to-do-list-e112b.firebaseapp.com",
  databaseURL: "https://to-do-list-e112b-default-rtdb.firebaseio.com",
  projectId: "to-do-list-e112b",
  storageBucket: "to-do-list-e112b.appspot.com",
  messagingSenderId: "487810261722",
  appId: "1:487810261722:web:c11bd975ed4bb70aea7be3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const Tasks = database.ref('tasks');

export function fetchTasks(callback) {
  Tasks.on('value', (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

export function updateTask(id, task) {
  Tasks.child(id).update(task);
}

export function deleteTask(id) {
  Tasks.child(id).remove();
}

export function createTask(note) {
  Tasks.push(note);
}
