import React, { useContext, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { commonContext } from '../ContextApi/commonContext';
// import auth from '@react-native-firebase/auth';
import {getApp}  from '@react-native-firebase/app';
import {getAuth}  from '@react-native-firebase/auth';
import { sendPasswordResetEmail } from '@react-native-firebase/auth';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const { theme: currentTheme } = useContext(commonContext);
    const { colors } = useTheme();

    const isFormValid = email.trim() !== '';

    const handleReset = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        const app =getApp();
        const auth =getAuth();

        try {
            await sendPasswordResetEmail(auth,email);
            Alert.alert(
                "Success",
                "Password reset email sent! Check your inbox.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            console.log(error);
            if (error.code === "auth/user-not-found") {
                Alert.alert("Error", "No account found with this email.");
            } else if (error.code === "auth/invalid-email") {
                Alert.alert("Error", "Invalid email address.");
            } else {
                Alert.alert("Error", "Something went wrong, try again.");
            }
        }
    };

    return (
        <SafeAreaView className={`flex-1 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 justify-center px-6"
            >
                <View
                    className={`p-6 rounded-2xl shadow-md w-full max-w-md self-center ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        }`}
                >
                    {/* Header */}
                    <View className="w-full flex items-center mb-6">
                        <Text
                            variant="headlineMedium"
                            style={{ color: '#3B82F6', fontWeight: 'bold' }}
                        >
                            Forgot Password
                        </Text>
                        <Text
                            style={{ color: colors.outline }}
                            className="mt-1 text-center"
                        >
                            Enter your email to receive a reset link
                        </Text>
                    </View>

                    {/* Email Input */}
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        className="mb-4 w-[75%]"
                        left={<TextInput.Icon icon="email-outline" />}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ backgroundColor: colors.surface }}
                    />

                    {/* Submit Button */}
                    <Button
                        mode="contained"
                        onPress={handleReset}
                        disabled={!isFormValid}
                        style={{ borderRadius: 14, marginTop: 20 }}
                        buttonColor="#3B82F6"
                        contentStyle={{ paddingVertical: 10 }}
                        labelStyle={{ fontSize: 16, fontWeight: '600', color: 'white' }}
                    >
                        Send Reset Link
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
