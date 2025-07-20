import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View className='w-full h-full bg-white justify-center items-center'>
            <Text>Login Screen</Text>
            <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
            <Button title="Forgot Password" onPress={() => navigation.navigate('forgotpassword')} />
        </View>
    );
}
