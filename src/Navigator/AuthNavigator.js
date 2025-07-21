import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import ForgotPassword from '../Authentication/ForgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();


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