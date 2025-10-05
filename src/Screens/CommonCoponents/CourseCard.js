import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { commonContext } from '../../ContextApi/commonContext';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CourseCard = ({ course }) => {
    const navigate =useNavigation()
    const { theme, toggleTheme } = useContext(commonContext);
    const isDark = theme === 'dark';
    return (
        <TouchableOpacity
            className={` ${isDark ? "bg-gray-600 border-gray-50" : "bg-white border-gray-200 "} border   rounded-2xl shadow-2xl  overflow-hidden m-2 w-[300px] h-[300px]`}
        >
            {/* Course Image with Active Badge */}
            <View className="relative  ">
                <Image
                    source={{ uri: course.introimg }}
                    className="w-full h-40 "
                    resizeMode="cover"
                />
                {course.isActive && (
                    <View className="absolute top-3 right-3 bg-green-600 px-3 py-1 rounded-full">
                        <Text className="text-white text-xs font-semibold">Active</Text>
                    </View>
                )}
            </View>

            <View className="flex-row justify-between ">
                <View className="flex-row justify-start space-x-6 ml-4 mt-1">
                    {course.video && (
                        <View className="flex-row items-center space-x-1 mr-4">
                            <Icon name="videocam" size={20} color="#2563EB" />
                            <Text className={`${isDark ? "text-gray-50" : "text-blue-600"} text-sm`}>Video</Text>
                        </View>
                    )}
                    {course.pdf && (
                        <View className="flex-row items-center space-x-1 mr-4">
                            <Icon name="picture-as-pdf" size={20} color="#EF4444" />
                            <Text className={`${isDark ? "text-gray-50" : "text-red-600"} text-sm`}>PDF</Text>
                        </View>
                    )}
                    {course.images && (
                        <View className="flex-row items-center space-x-1">
                            <Icon name="image" size={20} color="#F59E0B" />
                            <Text className={`${isDark ? "text-gray-50" : "text-yellow-600"} text-sm`}>Images</Text>
                        </View>
                    )}
                </View>
                <Text className={`${isDark ? "text-gray-50" : "text-gray-600"} text-sm mr-2 mt-1`}>
                    Medium: {course.medium}
                </Text>

            </View>

            {/* Course Info */}
            <View className="px-4 mt-1 flex-1">
                <View className="flex-row items-center justify-between">
                    {/* Course Name */}
                    <Text
                        className={`${isDark ? "text-gray-50" : "text-gray-800"} text-xl font-bold flex-1 `}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {course.courseName}
                    </Text>

                    {/* Mentor */}
                    <View className="flex-row items-center flex-1 ml-4">
                        <Icon name="person" size={16} color={isDark ? "#fff" : "#4B5563"} />
                        <Text
                            className={`${isDark ? "text-gray-50" : "text-gray-600"} text-sm ml-1`}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {course.mentorName}
                        </Text>
                    </View>

                    {/* Class */}
                    <View className="flex-row items-center flex-1 ">
                        <Icon name="school" size={16} color="#2563EB" />
                        <Text
                            className={`${isDark ? "text-gray-50" : "text-gray-600"} text-sm ml-1`}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            Class: {course.class}
                        </Text>
                    </View>


                </View>




                <Text
                    className={`${isDark ? "text-gray-50" : "text-gray-500 "} text-sm mb-3 flex-1`}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {course.shortdesc}
                </Text>

                <View className="flex flex-row justify-end mb-1">
                    <Text
                        className="text-green-600 font-semibold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        ₹{course.price}
                    </Text>
                </View>


                {/* Class & Enroll Button */}
                <View className="flex-row justify-between items-center mb-3">

                    {/* <TouchableOpacity
                        onPress={() => { }}
                        className="bg-blue-600 rounded-lg py-1 px-10 items-center shadow-xl active:opacity-80"
                    >
                        <Text className="text-white text-lg font-semibold">Enroll</Text>

                    </TouchableOpacity> */}
                    <Button
                        mode="contained"
                        dark={isDark}
                        buttonColor='#d4d4f7'
                        style={{ width: 150 }}  // set fixed width
                    >
                        Enroll
                    </Button>

                    <Button
                        mode="outlined"
                        dark={isDark}
                        style={{ width: 100 }}  // add some space
                        onPress={()=>navigate.navigate("CourseOverview",{course})}
                    >
                        Explore
                    </Button>


                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CourseCard;