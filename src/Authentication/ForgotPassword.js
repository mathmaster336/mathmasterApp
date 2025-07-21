import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const isFormValid = true
    //   email.trim() !== '';

    const handleReset = () => {
        // Add reset logic here
        alert('Password reset link sent!');
        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-blue-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 justify-center px-6"
            >
                <View className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md self-center">
                    <View className="w-full flex items-center mb-6">
                        <Text variant="headlineMedium" className="text-blue-800 font-bold">
                            Forgot Password
                        </Text>
                        <Text className="text-gray-500 mt-1 text-center">
                            Enter your email to receive a reset link
                        </Text>
                    </View>

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

                    <Button
                        mode="contained"
                        onPress={handleReset}
                        disabled={!isFormValid}
                        style={{ borderRadius: 14 }}
                        buttonColor="#3B82F6"
                        contentStyle={{ paddingVertical: 10 }}
                        labelStyle={{ fontSize: 16, fontWeight: '600', color: 'white' }}
                        className='mt-5'
                    >
                        Send Reset Link
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
