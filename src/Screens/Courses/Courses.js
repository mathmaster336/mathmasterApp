import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Menu } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { commonContext } from "../../ContextApi/commonContext";
import CourseCard from "../CommonCoponents/CourseCard";

// Helper function for dynamic filtering
// const filterCoursesDynamic = (courses, filters = {}) => {
//   const filterKeys = Object.keys(filters);
//   return courses.filter(course =>
//     filterKeys.every(key => {
//       const filterValue = filters[key];
//       if (!filterValue) return true; // ignore empty filters
//       return course[key].toString() === filterValue.toString();
//     })
//   );
// };

const filterdCoursesnew = (courses, filter = {}) => {
  // debugger
  const keys = Object.keys(filter);
  if (keys.length === 0) return courses;

  const newCourse = courses.filter((course) => {
    // Check if all filter keys match
    console.log(course["language"])
    return keys.every((key) => course[key] === filter[key]);
  });

  return newCourse;
};


function Courses() {
  const [classVisible, setClassVisible] = useState(false);
  const [subjectVisible, setSubjectVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);

  const [selectedClass, setSelectedClass] = useState(""); // store only the value
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [filterdCourses, setFilterdCourses] = useState([]);

  const { theme, courses } = useContext(commonContext);
  const isDark = theme === "dark";

  // Reset state when navigating away
  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedClass("");
        setSelectedSubject("");
        setSelectedLanguage("");
        setClassVisible(false);
        setSubjectVisible(false);
        setLanguageVisible(false);
      };
    }, [])
  );

  // Update filtered courses whenever courses or selected filters change
  useEffect(() => {
    if (courses?.length > 0) {
      // setFilterdCourses(
      //   courses
      // );

      let filterObj = {};

      console.log(selectedClass)

      // Only add a key if a value is selected
      if (selectedClass) filterObj.class = selectedClass.toString();
      if (selectedSubject) filterObj.courseName = selectedSubject;
      if (selectedLanguage) filterObj.medium = selectedLanguage;
      const course = filterdCoursesnew(courses, filterObj)
      console.log(filterObj,"obj")
      console.log(course,"fliter ourse")
      setFilterdCourses(course)
    }
  }, [courses, selectedClass, selectedSubject, selectedLanguage]);

  // Toggle menu
  const toggleMenu = menu => {
    if (menu === "class") {
      setClassVisible(!classVisible);
      setSubjectVisible(false);
      setLanguageVisible(false);
    } else if (menu === "subject") {
      setSubjectVisible(!subjectVisible);
      setClassVisible(false);
      setLanguageVisible(false);
    } else if (menu === "language") {
      setLanguageVisible(!languageVisible);
      setClassVisible(false);
      setSubjectVisible(false);
    }
  };

  return (
    <View className="">
      <View className="flex-row w-full">
        {/* Class Dropdown */}
        <View className="flex-1">
          <Menu
            visible={classVisible}
            onDismiss={() => setClassVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => toggleMenu("class")}
                className="border border-gray-400 p-2"
              >
                <Text className={`${isDark ? "text-gray-50" : "text-gray-600"} text-center`}>
                  {selectedClass ? `Class ${selectedClass}` : "Class"}
                </Text>
              </TouchableOpacity>
            }
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
              <Menu.Item
                key={num}
                onPress={() => {
                  setSelectedClass(num);
                  setClassVisible(false);
                }}
                title={`Class ${num}`}
              />
            ))}
          </Menu>
        </View>

        {/* Subject Dropdown */}
        <View className="flex-1">
          <Menu
            visible={subjectVisible}
            onDismiss={() => setSubjectVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => toggleMenu("subject")}
                className="border border-gray-400 p-2"
              >
                <Text className={`${isDark ? "text-gray-50" : "text-gray-600"} text-center`}>
                  {selectedSubject || "Subject"}
                </Text>
              </TouchableOpacity>
            }
          >
            {["Maths", "Science", "English", "History", "Geography"].map((sub, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setSelectedSubject(sub);
                  setSubjectVisible(false);
                }}
                title={sub}
              />
            ))}
          </Menu>
        </View>

        {/* Language Dropdown */}
        <View className="flex-1">
          <Menu
            visible={languageVisible}
            onDismiss={() => setLanguageVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => toggleMenu("language")}
                className="border border-gray-400 p-2"
              >
                <Text className={`${isDark ? "text-gray-50" : "text-gray-600"} text-center`}>
                  {selectedLanguage || "Language"}
                </Text>
              </TouchableOpacity>
            }
          >
            {["Hindi", "English"].map((lang, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setLanguageVisible(false);
                }}
                title={lang}
              />
            ))}
          </Menu>
        </View>
      </View>

      <ScrollView>
        <View className="items-center mt-4 mb-32">
          {filterdCourses?.map((course, index) => (
            <View
              key={index}
              className={`p-2 ${isDark ? "bg-gray-900" : "bg-gray-200"} rounded-lg m-1`}
            >
              <CourseCard course={course} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Courses;
