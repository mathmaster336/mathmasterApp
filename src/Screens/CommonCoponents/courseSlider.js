import React, { useRef, useState, useEffect, useContext } from "react";
import { View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import CourseCard from "./CourseCard";
import { ContentApi } from "../../Services/Axious/MMapi";
import { commonContext } from "../../ContextApi/commonContext";

export default function CourseCardSlider() {
  // const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const { theme, courses, setCourses } = useContext(commonContext);
  console.log(courses, "course from context")
  // Fetch courses from API
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const res = await ContentApi.post("/courses/userallcourses", {});
  //       res && setCourses(res);
  //     } catch (e) {
  //       console.error("Error fetching courses:", e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== null) {
        setCurrentIndex(newIndex);
        currentIndexRef.current = newIndex;
      }
    }
  }).current;

  const goToSlide = (offset) => {
    const newIndex = (currentIndex + offset + courses.length) % courses.length;
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;
  };

  if (!courses) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View className="relative">
      <FlatList
        data={courses}
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mx-2" style={{ width: 300, height: 330 }}>
            <CourseCard course={item} /> {/*  pass course as prop */}
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: 300 + 8, // 300 width + 2*margin 4px
          offset: (300 + 8) * index,
          index,
        })}
      />

      {/* Left Button */}
      <TouchableOpacity
        onPress={() => goToSlide(-1)}
        className="absolute left-3 top-[40%] bg-black/50 p-2 rounded-full"
      >
        <Entypo name="chevron-left" size={28} color="white" />
      </TouchableOpacity>

      {/* Right Button */}
      <TouchableOpacity
        onPress={() => goToSlide(1)}
        className="absolute right-3 top-[40%] bg-black/50 p-2 rounded-full"
      >
        <Entypo name="chevron-right" size={28} color="white" />
      </TouchableOpacity>

      {/* Indicator Dots */}
      <View className="absolute bottom-2 w-full flex-row justify-center space-x-2">
        {courses.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              style={{
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                width: isActive ? 20 : 8,
                backgroundColor: isActive ? "white" : "gray",
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
