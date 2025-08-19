
import axios from "axios";

export default async function getPublicIP() {
    try {
        const res = await axios.get("https://api.ipify.org?format=json");
        console.log("Public IP:", res.data.ip);
        return res.data.ip;
    } catch (error) {
        console.error("Error getting public IP:", error);
        return null;
    }
}
