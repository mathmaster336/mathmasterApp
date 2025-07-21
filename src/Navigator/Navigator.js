// import { NavigationContainer } from "@react-navigation/native"
// import AuthNavigator from "./AuthNavigator"
// import MainPageNavigator from "./MainPageNavigator"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { useContext } from "react"
// import { commonContext } from "../ContextApi/commonContext"

// const Navigator = () => {
//     const RootStack = createNativeStackNavigator();
//     const isLoggedIn = true
//     const { theme } = useContext(commonContext);

//     return (

//         <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
//             <RootStack.Navigator screenOptions={{ headerShown: false }}>

//                 {isLoggedIn ? (<RootStack.Screen name="MainApp" component={MainPageNavigator} />)
//                     :
//                     (<RootStack.Screen name="auth" component={AuthNavigator} />)}
//             </RootStack.Navigator>
//         </NavigationContainer>



//     )
// }

// export default Navigator
import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import MainPageNavigator from "./MainPageNavigator";
import { commonContext } from "../ContextApi/commonContext";

const RootStack = createNativeStackNavigator();

const Navigator = () => {
    const { theme } = useContext(commonContext);
    const isLoggedIn = true; // Replace with actual login state

    return (
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
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
