import React, { useRef, useState, useEffect, useContext } from 'react';
import {
    View,
    TextInput,
    Animated,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedCard from './AnimatedCard'; // <== We'll define this component next
import { commonContext } from '../../ContextApi/commonContext';
import CourseCard from '../CommonCoponents/CourseCard';
import CourseCardSlider from '../CommonCoponents/courseSlider';
import { Icon } from 'react-native-paper';

export default function Home() {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { theme } = useContext(commonContext);
    const isDark = theme === 'dark';
    const [CourseInfo, setCourseInfo] = useState();


    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [60, 0],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        const fetchCourses = async () => {
            // try {
            //     const res = await ContentApi.post("/courses/userAllcourse", {});
            //     console.log("Courses response:", res);
            //     setCourseInfo(res); // store only the data
            // } catch (error) {
            //     console.error("Error fetching courses", error);
            // }
        };

        fetchCourses();
    }, []);

    const cards = [
        {
            label: 'Courses',
            screen: 'Courses',
            icon: 'book-outline',
            colors: ['#3b82f6', '#06b6d4'],
            from: 'topLeft',
        },
        {
            label: 'E-Book',
            screen: 'Ebook',
            icon: 'document-text-outline',
            colors: ['#6366f1', '#8b5cf6'],
            from: 'topRight',
        },
        {
            label: 'Daily Problem',
            screen: 'DailyProblem',
            icon: 'bulb-outline',
            colors: ['#f59e0b', '#f97316'],
            from: 'bottomLeft',
        },
        {
            label: 'Question Papers',
            screen: 'QuestionPapers',
            icon: 'newspaper-outline',
            colors: ['#10b981', '#34d399'],
            from: 'bottomRight',
        },
    ];


    const course = {
        id: "sX3IOON0x4vUenf7hLMO",
        courseName: "Criminal law",
        price: "200",
        desc: "Short",
        shortdesc: "Short description this is Course",
        mentorName: "Nitu",
        language: "English",
        introimg: "https://firebasestorage.googleapis.com/v0/b/mathmaster-cbffc.firebasestorage.app/o/courses%2FCriminal%20law%20%2F1000260052.jpg?alt=media&token=21cf82f8-e7dd-451f-bbd9-17741929cb4d",
        introVideo: "https://firebasestorage.googleapis.com/v0/b/mathmaster-cbffc.firebasestorage.app/o/courses%2FCriminal%20law%20%2F1000259973.mp4?alt=media&token=f5c1e281-98e5-4798-9e52-ba6442a8919a",
        video: true,
        pdf: true,
        images: true,
        createdAt: 1751891177368,
        class: "9",
        medium: "English",
        isActive: true
    };


    return (
        <View className={`flex-1  ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {/* Animated Header */}
            <Animated.View
                style={{ height: headerHeight }}
                className={`px-2 ${isDark ? ' bg-gray-900' : 'bg-white '} justify-center`}
            >
                <View className="flex-row items-center mt-2 mb-2 ">
                    <View className={`flex-row items-center ${isDark ? ' bg-black' : 'bg-gray-100'} rounded-xl flex-1 px-1`}>
                        <Ionicons name="search-outline" size={20} color="gray" className="mr-3" />
                        <TextInput
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="Search..."
                            className={`flex-1 text-base ${isDark ? 'text-white' : 'text-blue-500'} `}
                            placeholderTextColor={isDark ? '#aaa' : '#888'}

                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </View>

                    {searchFocused && (
                        <TouchableOpacity onPress={() => {
                            setSearchText('');
                            setSearchFocused(false);
                        }}>
                            <Text className="text-sky-500 font-medium px-3">Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ padding: 16 }}
            >


                <View className="flex-row flex-wrap justify-between mt-4">
                    {cards.map((card, index) => (
                        <AnimatedCard
                            key={index}
                            index={index}
                            card={card}
                            onPress={() => navigation.navigate(card.screen)}
                        />
                    ))}
                </View>

                {/* <View>
                    <CourseCard course={course} />
                </View> */}
                <View className="">
                    {/* <IconButton icon="school" size={24} color="white" /> */}
                    <Text className={`${isDark ? "text-gray-50" : "text-gray-600"} text-xl ml-2`}>Courses :-</Text>
                    <CourseCardSlider />
                </View>
            </Animated.ScrollView>
        </View>
    );
}
