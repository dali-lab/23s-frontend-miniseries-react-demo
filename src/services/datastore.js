// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    storageBucket: '<your-storage-bucket>',
    projectId: '<your-project-id>',
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
