import React, { useContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { commonContext } from '../ContextApi/commonContext';
import { MMapi } from '../Services/Axious/MMapi';

export default function Register() {
  const { theme } = useContext(commonContext); // you can still use your custom theme if needed
  const navigation = useNavigation();
  const colorScheme = useColorScheme(); // auto detect system dark/light

  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Mob, setMob] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  // ✅ Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const handleRegister = async () => {
    setShowErrors(true);

    if (!name.trim()) return;
    if (!validateMobile(Mob)) return;
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    if (password !== confirmPassword) return;

    try {
      const res = await MMapi.post("/auth/userregister", {
        email,
        password,
        displayName: name,
        mobileNo: Mob,
      });

      console.log("✅ Registration Success:", res.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error("❌ API error:", error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#F9FAFB' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: 24 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
              backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
              alignSelf: 'center',
              width: '100%',
              maxWidth: 400,
            }}
          >
            {/* Heading */}
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '600',
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
              >
                Register
              </Text>
              <Text
                style={{
                  color: isDark ? '#9CA3AF' : '#6B7280',
                  marginTop: 4,
                }}
              >
                Create your new account
              </Text>
            </View>

            {/* Full Name */}
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={{ marginBottom: 4 }}
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
            {showErrors && name.trim() === '' && (
              <Text style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>
                Full Name is required
              </Text>
            )}

            {/* Mobile Number */}
            <TextInput
              label="Mobile Number"
              value={Mob}
              onChangeText={setMob}
              mode="outlined"
              keyboardType="phone-pad"
              style={{ marginBottom: 4 }}
              left={<TextInput.Icon icon="phone-outline" />}
              theme={{
                colors: {
                  text: isDark ? 'white' : 'black',
                  primary: '#3B82F6',
                  background: isDark ? '#2D2D2D' : 'white',
                  placeholder: isDark ? '#aaa' : '#666',
                },
              }}
            />
            {showErrors && !validateMobile(Mob) && (
              <Text style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>
                Mobile number must be exactly 10 digits
              </Text>
            )}

            {/* Email */}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginBottom: 4 }}
              left={<TextInput.Icon icon="email-outline" />}
              theme={{
                colors: {
                  text: isDark ? 'white' : '#000000',
                  primary: '#3B82F6',
                  background: isDark ? '#2D2D2D' : 'white',
                  placeholder: isDark ? '#aaa' : '#666',
                },
              }}
            />
            {showErrors && !validateEmail(email) && (
              <Text style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>
                Enter a valid email address
              </Text>
            )}

            {/* Password */}
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={{ marginBottom: 4 }}
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
            {showErrors && !validatePassword(password) && (
              <Text style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>
                Password must be 6+ chars, include a letter, number & special char
              </Text>
            )}

            {/* Confirm Password */}
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry
              style={{ marginBottom: 4 }}
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
            {showErrors && confirmPassword !== password && (
              <Text style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>
                Passwords do not match
              </Text>
            )}

            {/* Register Button */}
            <Button
              mode="contained"
              onPress={handleRegister}
              style={{
                borderRadius: 12,
                marginTop: 12,
                marginBottom: 20,
              }}
              buttonColor="#3B82F6"
              contentStyle={{ paddingVertical: 10 }}
              labelStyle={{ fontSize: 16, fontWeight: '600', color: 'white' }}
            >
              Register
            </Button>

            {/* Login Redirect */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: isDark ? '#D1D5DB' : '#374151' }}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#3B82F6' }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
