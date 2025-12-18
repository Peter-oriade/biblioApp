import firebaseApp from "./firebaseApp.js";
import { collection, query, where, doc, getDocs, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);

function getCollection(dbname) {
    return collection(db, dbname);
}

const firestoreServices = {
    async getAllFromDB(dbname) {
        const result = [];
        const q = query(getCollection(dbname));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            let d = doc.data();
            d.id = doc.id;
            result.push(d);
        });
        // result.sort((a, b) => a.id.localeCompare(b.id));
        return result;
    },

    async addToDB(body, dbname) {
        const docRef = doc(getCollection(dbname));
        await setDoc(docRef, body);
    }
}

export default firestoreServices;