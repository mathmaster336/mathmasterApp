import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./AuthNavigator"
import MainPageNavigator from "./MainPageNavigator"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ThemeProvider } from "../ContextApi/ThemeContext"

const Navigator = () => {
    const RootStack = createNativeStackNavigator();
    const isLoggedIn = true
    return (

        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>

                {isLoggedIn ? (<RootStack.Screen name="MainApp" component={MainPageNavigator} />)
                    :
                    (<RootStack.Screen name="auth" component={AuthNavigator} />)}
            </RootStack.Navigator>
        </NavigationContainer>



    )
}

export default Navigator