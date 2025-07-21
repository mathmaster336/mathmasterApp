import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {  TextInput, Button } from 'react-native-paper';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const isFormValid = true
    // name.trim() !== '' &&
    // email.trim() !== '' &&
    // password.trim() !== '' &&
    // password === confirmPassword;

    const handleRegister = () => {
        // Register logic here
        navigation.navigate('Login'); // Navigate back after register
    };

    return (
        <SafeAreaView className="flex-1 bg-blue-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 justify-center px-6"
            >
                <View className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md self-center">
                    <View className="w-full flex items-center mb-6">
                        <Text  className="text-gray-600 font-semibold text-3xl">
                            Register
                        </Text>
                        <Text className="text-gray-500 mt-1">Create your new account</Text>
                    </View>

                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        className="mb-4 bg-white w-[75%]"
                        left={<TextInput.Icon icon="account-outline" />}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        className="mb-4 bg-white w-[75%]"
                        left={<TextInput.Icon icon="email-outline" />}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry
                        className="mb-4 bg-white w-[75%]"
                        left={<TextInput.Icon icon="lock-outline" />}
                    />
                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        mode="outlined"
                        secureTextEntry
                        className="mb-4 bg-white w-[75%]"
                        left={<TextInput.Icon icon="lock-check-outline" />}
                    />

                    <Button
                        mode="contained"
                        onPress={handleRegister}
                        disabled={!isFormValid}
                        style={{ borderRadius: 14, marginBottom: 16 }}
                        buttonColor="#3B82F6"
                        contentStyle={{ paddingVertical: 10 }}
                        labelStyle={{ fontSize: 16, fontWeight: '600', color: 'white' }}
                        className='mt-5'
                    >
                        Register
                    </Button>

                    <View className="flex-row justify-center mt-2">
                        <Text className="text-gray-600">Already have an account? </Text>
                        {/* onPress={() => navigation.navigate('Login')} */}
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-blue-500">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
