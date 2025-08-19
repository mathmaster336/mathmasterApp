import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../Screens/Home/Home';
import Courses from '../Screens/Courses/Courses';
import Profile from '../Screens/Profiles/Profile';
import CourseOverView from '../Screens/Courses/CourseOverView';
import { commonContext } from '../ContextApi/commonContext';
import EditProfile from '../Screens/Profiles/EditProfile';

const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const ProfileStack =createNativeStackNavigator();


function ProfilePages(){
    return(
        <ProfileStack.Navigator screenOptions={{headerShown:false}}>
            <ProfileStack.Screen name='profilepage' component={Profile}/>
            <ProfileStack.Screen name='editprofile' component={EditProfile}/>

        </ProfileStack.Navigator>
    )
}

const BottomTabNavigator = () => {
    const { theme } = useContext(commonContext);
    const isDark = theme === 'dark';

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,

                tabBarStyle: {
                    height: "10%",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingBottom: 5,
                    backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
                    position: 'absolute',

                    borderTopWidth: 0,

                },
                tabBarActiveTintColor: isDark ? '#0a84ff' : '#007aff',
                tabBarInactiveTintColor: isDark ? '#aaa' : 'gray',



                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Courses') iconName = focused ? 'book' : 'book-outline';
                    else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

                    return <Ionicons name={iconName} size={20} color={color} />;
                },
            })}
        >
            <BottomTab.Screen name="HomeTab" component={Home} options={{ tabBarLabel: 'Home' }} />
            <BottomTab.Screen name="Courses" component={Courses} options={{ tabBarLabel: 'Courses' }} />
            <BottomTab.Screen name="Profile" component={ProfilePages} options={{ tabBarLabel: 'Profile' }} />
        </BottomTab.Navigator>
    );
};

// ✅ Drawer Navigator (wrapping the Bottom Tabs)
function DrawerNavigatorLayout() {
    const { theme } = useContext(commonContext);
    const isDark = theme === 'dark';

    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    height:70,
                    backgroundColor: isDark ? '#1c1c1e' : '#d8e0ed',
                },
                headerTitleStyle: {
                    fontSize: 15,
                    color: isDark ? '#0a84ff' : '#000',
                },
                drawerStyle: {
                    backgroundColor: isDark ? '#1c1c1e' : '#ffffff', // Drawer BG

                },
                sceneContainerStyle: {
                    backgroundColor: isDark ? '#000000' : '#f2f2f2', // Main screen BG
                },
                drawerActiveTintColor: isDark ? '#0a84ff' : '#007aff',
                drawerInactiveTintColor: isDark ? '#ccc' : '#333',
                drawerLabelStyle: {
                    fontSize: 14,
                },
            }}
        >
            <Drawer.Screen name="Dashboard" component={BottomTabNavigator} />
        </Drawer.Navigator>
    );
}

// ✅ Main Stack Navigator (root-level)
function MainPageNavigator() {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="MainDrawer" component={DrawerNavigatorLayout} />
            <MainStack.Screen name="CourseOverview" component={CourseOverView} />
        </MainStack.Navigator>
    );
}

export default MainPageNavigator;

