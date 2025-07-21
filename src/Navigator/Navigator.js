import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./AuthNavigator"
import MainPageNavigator from "./MainPageNavigator"

const Navigator =()=>{
    return(
        <NavigationContainer>
            {/* <AuthNavigator /> */}
            <MainPageNavigator/>
        </NavigationContainer>

    )
}

export default Navigator