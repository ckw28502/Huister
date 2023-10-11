// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJwXKU8hr7fUGyDiOp6gkeSOabcJfPiBo",
  authDomain: "huister-83675.firebaseapp.com",
  projectId: "huister-83675",
  storageBucket: "huister-83675.appspot.com",
  messagingSenderId: "632398167501",
  appId: "1:632398167501:web:4ec7614f53209bd1909884"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

function uploadImage(image,filePath) {
    const storage=getStorage()
    const storageRef=ref(storage,`images/${filePath}`)
    return uploadBytes(storageRef,image)
    .then((snapShot)=>snapShot.metadata.fullPath)
    
}

export default {
    firebaseApp,
    uploadImage
};