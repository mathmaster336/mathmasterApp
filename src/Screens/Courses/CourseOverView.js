import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import OverviewScreen from "./OverviewScreen";
import ContentScreen from "./ContentScreen";
import DiscussionScreen from "./DiscussionScreen";

// Dummy Screens



const Tab = createMaterialTopTabNavigator();

function CourseOverView() {
    const navigation = useNavigation();
    const route = useRoute();
    const { course } = route.params;



    return (
        <View className="flex-1">
            {/* Top Tabs */}
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#2563EB", // Active text color
                    tabBarInactiveTintColor: "#6B7280", // Inactive text color
                    tabBarIndicatorStyle: { backgroundColor: "#2563EB", height: 2 }, // underline
                    tabBarLabelStyle: { fontWeight: "bold" },
                    tabBarStyle: {
                        paddingTop: 20, // 👈 Add padding above tab bar

                    },
                }}
            >
                <Tab.Screen name="Overview" component={OverviewScreen} initialParams={{ course }} // 👈 Pass course here
                />
                <Tab.Screen name="Content" component={ContentScreen} initialParams={{course}} />
                <Tab.Screen name="Discussion" component={DiscussionScreen} initialParams={{course}}/>
            </Tab.Navigator>

            {/* Example Button to navigate away */}
            {/* <View className="p-4">
                <Button mode="contained" onPress={() => navigation.navigate("MainDrawer")}>
                    Go to Drawer
                </Button>
            </View> */}
        </View>
    );
}

export default CourseOverView;
