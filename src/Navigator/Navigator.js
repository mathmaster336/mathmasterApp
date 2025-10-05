import { useContext, useEffect, useMemo } from "react";
import { Alert } from "react-native";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import MainPageNavigator from "./MainPageNavigator";
import { commonContext } from "../ContextApi/commonContext";
import { getDeviceUniqueId } from "../firebaseMethod/deviceHelper";
import StorageHelper from "../firebaseMethod/storageHelper";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ContentApi } from "../Services/Axious/MMapi";

const RootStack = createNativeStackNavigator();

const Navigator = () => {
    const { theme, isLoggedIn, setCourses } = useContext(commonContext);

    useMemo(() => {
        const checkLogin = async () => {

            const deviceId = await getDeviceUniqueId();
            const uid = await StorageHelper.getData("user_token"); // fix: added await
            console.log("check lofin in uid", uid)
            if (!uid) return;

            const docRef = firestore().collection("activeUser").doc(uid);
            const docSnap = await docRef.get();

            if (docSnap.exists) {
                const firebaseDeviceId = docSnap.data().deviceId;

                if (firebaseDeviceId !== deviceId) {
                    console.log("❌ Device mismatch → Forcing logout...");

                    // Clear storage + Firebase signOut
                    await StorageHelper.removeData("user_token");
                    await auth().signOut();

                    Alert.alert(
                        "Session Expired",
                        "You have been logged out because your account was used on another device."
                    );
                } else {
                    console.log("✅ Device matched → continue session");
                }
            }

        };

        checkLogin();

    }, []); // ✅ ensures it runs only once at startup

    useEffect(() => { fetchCourses(); }, [])
    const fetchCourses = async () => {

        try {
            const res = await ContentApi.post("/courses/userallcourses", {});
            // debugger
            console.log(res,"courses in navigator")
            res && setCourses(res);
        } catch (e) {
            console.error("Error fetching courses:", e);
        }
    };

    return (
        <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                    <RootStack.Screen name="MainApp" component={MainPageNavigator} />
                ) : (
                    <RootStack.Screen name="auth" component={AuthNavigator} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
