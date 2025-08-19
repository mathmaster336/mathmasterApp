import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';

const EditProfile = ({ navigation }) => {
    // Pre-filled mock data
    const [profile, setProfile] = useState({
        fullName: 'Vikas Sharma',
        username: 'vikas_dev',
        email: 'vikas@example.com',
        phone: '+91-9876543210',
        dob: '2000-01-01',
        gender: 'Male',
        courseStatus: '75% Completed',
        quizScores: '85%, 92%, 78%',
        assignments: '5 of 6 Submitted',
        feedback: '4.5 Stars',
        parentName: 'Suman Sharma',
        parentContact: '+91-9123456789',
        parentalConsent: 'Granted',
        profileImage: 'https://i.pravatar.cc/300',
    });

    const handleChange = (key, value) => {
        setProfile({ ...profile, [key]: value });
    };

    const handleSave = () => {
        // Save logic (e.g., send to Firestore)
        console.log('Updated Profile:', profile);
        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-white pb-10">
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
                <View className="items-center mb-6">
                    <Avatar.Image size={100} source={{ uri: profile.profileImage }} />
                    <Text className="text-xl font-bold mt-3">Edit Profile</Text>
                </View>

                {/* Editable Fields */}
                <TextInput
                    label="Full Name"
                    value={profile.fullName}
                    onChangeText={(text) => handleChange('fullName', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Username"
                    value={profile.username}
                    onChangeText={(text) => handleChange('username', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Email"
                    value={profile.email}
                    onChangeText={(text) => handleChange('email', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Phone"
                    value={profile.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Date of Birth"
                    value={profile.dob}
                    onChangeText={(text) => handleChange('dob', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Gender"
                    value={profile.gender}
                    onChangeText={(text) => handleChange('gender', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Course Completion Status"
                    value={profile.courseStatus}
                    onChangeText={(text) => handleChange('courseStatus', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Quiz Scores"
                    value={profile.quizScores}
                    onChangeText={(text) => handleChange('quizScores', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Assignment Submissions"
                    value={profile.assignments}
                    onChangeText={(text) => handleChange('assignments', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Feedback & Ratings"
                    value={profile.feedback}
                    onChangeText={(text) => handleChange('feedback', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Parent Name"
                    value={profile.parentName}
                    onChangeText={(text) => handleChange('parentName', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Parent Contact Info"
                    value={profile.parentContact}
                    onChangeText={(text) => handleChange('parentContact', text)}
                    className="mb-3"
                    mode="outlined"
                />
                <TextInput
                    label="Parental Consent"
                    value={profile.parentalConsent}
                    onChangeText={(text) => handleChange('parentalConsent', text)}
                    className="mb-4"
                    mode="outlined"
                />

                {/* Save Button */}
                <Button mode="contained" onPress={handleSave} className="rounded-md mt-4" style={{ borderRadius: 14, marginBottom: 16 }}
                    buttonColor="#3B82F6">
                    Save Changes
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
