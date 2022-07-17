import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config={
apiKey: "AIzaSyA0lyzfqsso_S4oatfY54kbOZ5P_iMuPmA",
authDomain: "sanlaap.firebaseapp.com",
databaseURL: "https://sanlaap-default-rtdb.firebaseio.com",
projectId: "sanlaap",
storageBucket: "sanlaap.appspot.com",
messagingSenderId: "244714357747",
appId: "1:244714357747:web:9e7667e81fdef193d38886"
}


const app=firebase.initializeApp(config);
export const auth =app.auth();
export const database=app.database();
export const storage=app.storage();

