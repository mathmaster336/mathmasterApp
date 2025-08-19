
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"
import MMapi from "../Services/Axious/MMapi";

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        const userIP = await axios.get("https://api.ipify.org?format=json");

        // Send UID to backend
        const res = await MMapi.post("/userLogin", { uid });


        return { success: true, uid, backendData: res.data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}