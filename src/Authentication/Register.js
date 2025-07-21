import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { commonContext } from '../ContextApi/commonContext';

export default function Register() {
  const { theme } = useContext(commonContext);
  const isDark = theme === 'dark';
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    password === confirmPassword;

  const handleRegister = () => {
    // Registration logic here
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center px-6"
      >
        <View
          className={`p-6 rounded-2xl shadow-md w-full max-w-md self-center ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <View className="w-full flex items-center mb-6">
            <Text
              className={`text-3xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-700'
              }`}
            >
              Register
            </Text>
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-500'} mt-1`}>
              Create your new account
            </Text>
          </View>

          {/* Full Name */}
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            className="mb-4 w-[75%]"
            left={<TextInput.Icon icon="account-outline" />}
            theme={{
              colors: {
                text: isDark ? 'white' : 'black',
                primary: '#3B82F6',
                background: isDark ? '#2D2D2D' : 'white',
                placeholder: isDark ? '#aaa' : '#666',
              },
            }}
          />

          {/* Email */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-4 w-[75%]"
            left={<TextInput.Icon icon="email-outline" />}
            theme={{
              colors: {
                text: isDark ? 'white' : 'black',
                primary: '#3B82F6',
                background: isDark ? '#2D2D2D' : 'white',
                placeholder: isDark ? '#aaa' : '#666',
              },
            }}
          />

          {/* Password */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            className="mb-4 w-[75%]"
            left={<TextInput.Icon icon="lock-outline" />}
            theme={{
              colors: {
                text: isDark ? 'white' : 'black',
                primary: '#3B82F6',
                background: isDark ? '#2D2D2D' : 'white',
                placeholder: isDark ? '#aaa' : '#666',
              },
            }}
          />

          {/* Confirm Password */}
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry
            className="mb-4 w-[75%]"
            left={<TextInput.Icon icon="lock-check-outline" />}
            theme={{
              colors: {
                text: isDark ? 'white' : 'black',
                primary: '#3B82F6',
                background: isDark ? '#2D2D2D' : 'white',
                placeholder: isDark ? '#aaa' : '#666',
              },
            }}
          />

          {/* Register Button */}
          <Button
            mode="contained"
            onPress={handleRegister}
            disabled={!isFormValid}
            style={{ borderRadius: 14, marginBottom: 16 ,marginTop:10}}
            buttonColor="#3B82F6"
            contentStyle={{ paddingVertical: 10 }}
            labelStyle={{ fontSize: 16, fontWeight: '600', color: 'white' }}
          >
            Register
          </Button>

          {/* Login Redirect */}
          <View className="flex-row justify-center mt-2">
            <Text className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-blue-500">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
