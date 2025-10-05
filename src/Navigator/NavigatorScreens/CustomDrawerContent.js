import React, { useContext } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Switch,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { commonContext } from "../../ContextApi/commonContext";

export default function CustomDrawerContent(props) {
    const { theme, setTheme, logout, user, toggleTheme } = useContext(commonContext);
    const isDark = theme === "dark";

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1 }}
            className={isDark ? "bg-[#121212]" : "bg-white"}
        >
            {/* Profile Section */}
            <View className="flex flex-row py-3 border-b border-gray-300 dark:border-gray-700">
                <Image
                    source={{
                        uri:
                            user?.photoURL ||
                            "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
                    }}
                    className="w-16 h-16 ml-5 rounded-full mb-3 border-2 border-blue-500"
                />
                <View className="ml-5">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white">
                        {user?.name || "Guest User"}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email || "guest@example.com"}
                    </Text>
                </View>
            </View>

            {/* Drawer Screens */}
            <View className="flex-1 pt-2">
                <DrawerItemList {...props} />
            </View>

            {/* Bottom Section */}
            <View className="mt-auto px-4 py-3 border-t border-gray-300 dark:border-gray-700">
                {/* Dark Mode Toggle */}
                <TouchableOpacity
                    onPress={() => toggleTheme()}
                    className="flex-row items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-3 rounded-xl"
                >
                    <View className="flex-row items-center">
                        <Ionicons
                            name={isDark ? "moon" : "sunny"}
                            size={22}
                            color={isDark ? "#facc15" : "#f59e0b"}
                        />
                        <Text className="ml-3 font-medium text-gray-800 dark:text-gray-200">
                            {isDark ? "Dark Mode" : "Light Mode"}
                        </Text>
                    </View>
                    <View
                        className={`w-10 h-5 rounded-full ${isDark ? "bg-blue-500" : "bg-gray-400"
                            } flex-row items-center px-1`}
                    >
                        <View
                            className={`w-4 h-4 rounded-full bg-white transform ${isDark ? "translate-x-5" : "translate-x-0"
                                }`}
                        />
                    </View>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity
                    className="mt-4 bg-red-500 py-3 rounded-xl items-center shadow-md active:scale-95"
                    onPress={logout}
                >
                    <Text className="text-white font-bold text-base">Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}
