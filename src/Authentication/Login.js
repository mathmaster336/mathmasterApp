import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonContext } from '../ContextApi/commonContext';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { MMapi } from '../Services/Axious/MMapi';
import { getDeviceUniqueId } from '../firebaseMethod/deviceHelper';
import StorageHelper from '../firebaseMethod/storageHelper';
// import {auth} from "../../firebase"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { theme, toggleTheme, setisLoggedIn, isLoggedIn } = useContext(commonContext);
  const isDark = theme === 'dark';

  const handleLogin = async () => {
    debugger;
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    try {
      // Sign in with Firebase email & password
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      const uid = userCredential.user.uid;
      const deviceId = await getDeviceUniqueId();


      console.log("Uidu", uid);
      console.log("DeviceID ", deviceId);


      console.log("Logged in user:", userCredential.user.email);
      // navigation.navigate('Second');
      setisLoggedIn(!isLoggedIn)
      StorageHelper.storeData("user_token", uid)

    } catch (error) {
      // console.log("Login Error: ", error);

      // // Show alert or error message
      // let errorMessage = "Something went wrong!";
      // if (error.code === 'auth/invalid-email') {
      //   errorMessage = "Invalid email format!";
      // } else if (error.code === 'auth/user-not-found') {
      //   errorMessage = "No user found with this email.";
      // } else if (error.code === 'auth/wrong-password') {
      //   errorMessage = "Incorrect password.";
      // }

      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center px-6"
      >
        <View
          className={`p-6 rounded-2xl shadow-md w-full max-w-md self-center ${isDark ? 'bg-gray-800' : 'bg-white'
            }`}
        >
          {/* Header */}
          <View className="w-full flex items-center mb-6">
            <Text
              className={`font-bold text-3xl ${isDark ? 'text-white' : 'text-gray-700'
                }`}
            >
              Math Master
            </Text>
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-500'} mt-1`}>
              Welcome back! Please login
            </Text>
          </View>

          {/* Email */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            left={<TextInput.Icon icon="email-outline" />}
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-4 w-[75%]"
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
            left={<TextInput.Icon icon="lock-outline" />}
            className="mb-2 w-[75%]"
            theme={{
              colors: {
                text: isDark ? 'white' : 'black',
                primary: '#3B82F6',
                background: isDark ? '#2D2D2D' : 'white',
                placeholder: isDark ? '#aaa' : '#666',
              },
            }}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            className="self-end mb-4"
            onPress={() => navigation.navigate('forgotpassword')}
          >
            <Text className="text-blue-400 text-md font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            mode="contained"
            loading={loading}
            onPress={handleLogin}
            disabled={!isFormValid || loading}
            style={{ borderRadius: 14, marginBottom: 16 }}
            buttonColor="#3B82F6"
            contentStyle={{ paddingVertical: 10 }}
            labelStyle={{ fontSize: 16, fontWeight: '600', color: 'white' }}
          >
            Login
          </Button>

          {/* Google Login */}
          <Button
            mode="outlined"
            icon="google"
            onPress={() => { }}
            className="rounded-md mb-4 border-blue-500"
            textColor="#2563eb"
            contentStyle={{ paddingVertical: 6 }}
            labelStyle={{ fontSize: 15 }}
          >
            Continue with Google
          </Button>

          {/* Register Link */}
          <View className="flex-row justify-center mt-2">
            <Text className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-blue-500 text-md">Register</Text>
            </TouchableOpacity>
          </View>

          {/* Theme Toggle */}
          <TouchableOpacity className="mt-6 items-center" onPress={toggleTheme}>
            <Text className="text-blue-400 text-sm">
              Switch to {isDark ? 'Light' : 'Dark'} Mode
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
