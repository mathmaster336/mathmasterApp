import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./AuthNavigator"

const Navigator =()=>{
    return(
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>

    )
}

export default Navigator