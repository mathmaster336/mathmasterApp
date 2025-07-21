import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../Screens/Home/Home';
import Courses from '../Screens/Courses/Courses';
import Profile from '../Screens/Profiles/Profile';
import CourseOverView from '../Screens/Courses/CourseOverView';

const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: 50,                // 👈 height of the whole tab bar
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    elevation: 0,
                    paddingBottom: 5,          // 👈 reduce bottom padding
                    paddingTop: 5,             // 👈 reduce top padding
                },
                tabBarItemStyle: {
                    paddingVertical: 0,        // 👈 remove extra padding from each item
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeTab') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Courses') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: '#007aff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <BottomTab.Screen
                name="HomeTab"
                component={Home}
                options={{ tabBarLabel: 'Home' }}
            />
            <BottomTab.Screen
                name="Courses"
                component={Courses}
                options={{
                    tabBarLabel: 'Courses',
                    headerShown: false, // 👈 Hides only the Courses header
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{ tabBarLabel: 'Profile' }}
            />
        </BottomTab.Navigator>
    );
};


// ✅ Drawer Navigator (wrapping the Bottom Tabs)
function DrawerNavigatorLayout() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    height: 50,
                    backgroundColor: '#d8e0ed',
                },
                headerTitleStyle: {
                    fontSize: 18,
                },
            }}
        >
            <Drawer.Screen name="Dashboard" component={BottomTabNavigator} />
            {/* You can add more items here if needed */}
        </Drawer.Navigator>
    );
}


// ✅ Main Stack Navigator (root-level)
function MainPageNavigator() {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="MainDrawer" component={DrawerNavigatorLayout} />
            <MainStack.Screen name='CourseOverview' component={CourseOverView} />
        </MainStack.Navigator>
    );
}

export default MainPageNavigator;
