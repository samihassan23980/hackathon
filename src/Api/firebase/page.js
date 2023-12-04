import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { deleteDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBpnopijtGip8NPvrqVX_JwQueziBeV9hQ",
  authDomain: "nextfirst-73b4c.firebaseapp.com",
  projectId: "nextfirst-73b4c",
  storageBucket: "nextfirst-73b4c.appspot.com",
  messagingSenderId: "672612725038",
  appId: "1:672612725038:web:eadb5b6715a62c56000abf",
  measurementId: "G-TX5Z55R75Q",
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();

async function AddUser(email, password, fullName, image) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      addUserDetail(user.uid, fullName, user.email, image);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

async function addUserDetail(uid, fullName, email, image) {
  const url = await sendFile(image);
  const docRef = await addDoc(collection(db, "users"), {
    uid,
    displayName: fullName,
    email,
    imageURL: url,
  });
}

async function addBlogPost(text, name, file) {
  const url = await sendFile(file);
  const docRef = await addDoc(collection(db, "post"), {
    message: text,
    profileName: name,
    feedImage: url,
  });
}

async function getPost() {
  const list = [];
  const querySnapshot = await getDocs(collection(db, "post"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push(doc.data());
  });
  return list;
}

function LoginWithUSer(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

async function sendFile(file) {
  try {
    const imagesRef = ref(storage, "images/" + file.name);
    await uploadBytes(imagesRef, file);
    const url = getDownloadURL(imagesRef);
    return url;
  } catch (e) {
    alert(e.message);
  }
}

async function getUsers() {
  const list = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push(doc.data());
  });
  return list;
}



async function getActiveUSer() {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
   


      // ...
    } else {
      // User is signed out
      // ...
    }
  });
 
}

async function getOne(id) {


 const uid = "uid"
 const at = "oyxl6XIjBHVpqSgbhf7009bIyTv2"
 const data = {}
  try {
    const q = query(collection(db, "users"), where(uid, "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    
     const get = doc.data()
Object.assign(data , get)
   
    });

    return data
    
   
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    // You can handle the error appropriately, such as logging, displaying a message, or throwing it further.
  }

 

}

getActiveUSer();



async function sendMessageInDb(message, activeUSer, jisBhaikoSendKIa , fullName) {

  
  try{
  const docRef = await addDoc(collection(db, "chats"), {
    message ,
    activeUSer,
    jisBhaikoSendKIa,
    jiskosendkisuskaname : fullName,
  });
  alert("message send sucees")
}
catch(e){
  console.log(e.message)
}
}


async function getChatsInDB(id){
  const uid = "jisBhaikoSendKIa"
 const at = id
 const data = []
  try {
    const q = query(collection(db, "chats"), where(uid, "==", at));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    data.push(doc.data())
    });

    return data
    
   
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    // You can handle the error appropriately, such as logging, displaying a message, or throwing it further.
  }
}

export {
  addBlogPost,
  getPost,
  AddUser,
  LoginWithUSer,
  getUsers,
  getOne,
  sendMessageInDb,
  getChatsInDB
};
