
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Card, Text, Avatar, FAB, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, { signOut } from "@react-native-firebase/auth"
import StorageHelper from '../../firebaseMethod/storageHelper';
import { commonContext } from '../../ContextApi/commonContext';

function Profile({ navigation }) {
    const profileData = {
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
    };

    const { theme, isLoggedIn, setisLoggedIn } = useContext(commonContext);

    const DetailItem = ({ icon, label, value }) => (
        <View className="flex-row items-start mb-3">
            <Icon name={icon} size={22} color="#555" style={{ marginRight: 10, marginTop: 2 }} />
            <View className="flex-1">
                <Text className="text-base font-semibold text-gray-700">{label}</Text>
                <Text className="text-base text-gray-800">{value}</Text>
            </View>
        </View>
    );

    const handleEditPress = () => {
        // Navigate to EditProfile screen or open a modal
        navigation?.navigate?.('editprofile'); // You must create this screen
    };
    const handleLogout = async () => {
        debugger
        try {
            // await auth().signOut();
            // await auth.signOut()
            await StorageHelper.removeData("user_token");
            console.log(StorageHelper.getData("user_token"))

            setisLoggedIn(false); // user is logged out
        } catch (error) {
            console.log("Logout Error:", error);
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white relative pb-20">
            <ScrollView
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center mb-6">
                    <Avatar.Image size={100} source={{ uri: profileData.profileImage }} />
                    <Text className="text-xl font-bold mt-3">{profileData.fullName}</Text>
                </View>

                {/* Student Info */}
                <Card className="mb-6">
                    <Card.Title title="Student Information" />
                    <Card.Content>
                        <DetailItem icon="account" label="Username" value={profileData.username} />
                        <DetailItem icon="email" label="Email" value={profileData.email} />
                        <DetailItem icon="phone" label="Phone" value={profileData.phone} />
                        <DetailItem icon="calendar" label="Date of Birth" value={profileData.dob} />
                        <DetailItem icon="gender-male-female" label="Gender" value={profileData.gender} />
                        <DetailItem icon="progress-check" label="Course Status" value={profileData.courseStatus} />
                        <DetailItem icon="clipboard-text" label="Quiz Scores" value={profileData.quizScores} />
                        <DetailItem icon="file-document" label="Assignments" value={profileData.assignments} />
                        <DetailItem icon="star" label="Feedback" value={profileData.feedback} />
                    </Card.Content>
                </Card>

                {/* Parental Info */}
                <Card>
                    <Card.Title title="Parental Information" />
                    <Card.Content>
                        <DetailItem icon="account-child" label="Parent Name" value={profileData.parentName} />
                        <DetailItem icon="phone-in-talk" label="Parent Contact" value={profileData.parentContact} />
                        <DetailItem icon="shield-check" label="Parental Consent" value={profileData.parentalConsent} />
                    </Card.Content>
                </Card>
                {/* FAB Edit Button */}
                {/* <FAB
                    icon="pencil"
                    label="Edit"
                    style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 30,
                    }}
                    onPress={handleEditPress}
                /> */}

                <FAB
                    icon="pencil"
                    label="logout"
                    style={{
                        position: 'absolute',
                        left: 20,
                        bottom: 30,
                    }}
                    onPress={handleLogout}
                />

            </ScrollView>


        </SafeAreaView>
    );
}

export default Profile;
