import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import ForgotPassword from '../Authentication/ForgotPassword';

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />
            <AuthStack.Screen name="forgotpassword" component={ForgotPassword} />


        </AuthStack.Navigator>

    )

}

export default AuthNavigator