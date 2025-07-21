import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        setLoading(true);

        // Simulate login delay
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Second');
        }, 1500);
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    return (
        <SafeAreaView className="flex-1 bg-blue-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 justify-center px-6"
            >
                <View className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md self-center">
                    {/* Header */}
                    <View className="w-full flex items-center mb-6">
                        <Text variant="headlineMedium" className="text-gray-600 font-bold text-3xl">
                            Math Master
                        </Text>
                        <Text className="text-gray-500 mt-1">Welcome back! Please login</Text>
                    </View>

                    {/* Email */}
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

                    {/* Password */}
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry
                        className="mb-2 bg-white w-[75%] "
                        left={<TextInput.Icon icon="lock-outline" />}
                    />

                    {/* Forgot Password */}
                    <TouchableOpacity className="self-end mb-4" onPress={() => navigation.navigate('forgotpassword')}>
                        <Text className="text-blue-700 text-md  font-medium">Forgot Password ?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <Button
                        mode="contained"
                        loading={loading}
                        onPress={handleLogin}
                        disabled={!isFormValid || loading}
                        style={{ borderRadius: 14, marginBottom: 16 }}
                        buttonColor="#3B82F6"
                        contentStyle={{
                            paddingVertical: 10,
                        }}
                        labelStyle={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'white',
                        }}
                    >
                        Login
                    </Button>

                    {/* Google Login */}
                    <Button
                        mode="outlined"
                        icon="google"
                        onPress={() => { }}
                        className="rounded-md border-blue-500 mb-4 "
                        textColor="#2563eb"
                        contentStyle={{ paddingVertical: 6 }}
                        labelStyle={{ fontSize: 15 }}
                    >
                        Continue with Google
                    </Button>

                    {/* Register Link */}
                    <View className="flex-row justify-center mt-2">
                        <Text className="text-gray-600 ">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text className="text-blue-700  text-md ">Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
