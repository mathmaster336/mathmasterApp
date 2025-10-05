import { useRoute } from '@react-navigation/native';
import React, { useContext, useRef, useState } from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import Video from 'react-native-video';
import { commonContext } from '../../ContextApi/commonContext';

const { width, height } = Dimensions.get("window");

function OverviewScreen() {
  const route = useRoute();
  const { course } = route.params;
  const playerRef = useRef(null);
  const { theme } = useContext(commonContext);
  const isDark = theme === 'dark';

  const handleEnd = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: width * 0.04,
        paddingTop: height * 0.02,
        backgroundColor: isDark ? "#121212" : "#f9f9f9",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Intro Video */}
      {course?.introVideo && (
        <Card
          style={{
            marginBottom: height * 0.02,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
          }}
        >
          <Video
            ref={playerRef}
            source={{ uri: course.introVideo }}
            style={{ width: "100%", height: height * 0.25 }}
            controls
            resizeMode="contain"
            volume={1}
            onEnd={handleEnd}
          />
        </Card>
      )}

      {/* Media Icons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: height * 0.02,
        }}
      >
        {course.video && <IconButton icon="video" size={22} mode="contained" iconColor="red" />}
        {course.pdf && <IconButton icon="file-pdf-box" size={22} mode="contained" iconColor="goldenrod" />}
        {course.images && <IconButton icon="image" size={22} mode="contained" iconColor="green" />}
      </View>

      {/* Course Info */}
      <Text
        style={{
          fontSize: width * 0.07,
          fontWeight: "700",
          marginBottom: 8,
          color: isDark ? "#4da6ff" : "#2563eb",
        }}
      >
        {course.courseName}
      </Text>

      <Text
        style={{
          fontSize: width * 0.05,
          color: isDark ? "#ccc" : "#374151",
          marginBottom: 6,
        }}
      >
        Subject: {course.shortdesc}
      </Text>

      <Text
        style={{
          fontSize: width * 0.045,
          color: isDark ? "#ccc" : "#374151",
          marginBottom: 6,
        }}
      >
        Class: {course.class}
      </Text>

      <Text
        style={{
          fontSize: width * 0.045,
          color: isDark ? "#ccc" : "#374151",
        }}
      >
        Mentor: {course.mentorName}
      </Text>

      {/* Description */}
      <View style={{ marginTop: height * 0.03 }}>
        <Text
          style={{
            fontSize: width * 0.045,
            lineHeight: width * 0.06,
            color: isDark ? "#e5e5e5" : "#1f2937",
          }}
        >
          {course.desc}
        </Text>
      </View>

      {/* Price */}
      <View style={{ alignItems: "flex-end", marginTop: height * 0.02 }}>
        <Text
          style={{
            fontSize: width * 0.05,
            fontWeight: "600",
            color: isDark ? "#fff" : "#000",
          }}
        >
          Price:{" "}
          <Text style={{ color: "green", fontWeight: "700" }}>
            ₹{course.price}
          </Text>
        </Text>
      </View>

      {/* Intro Image */}
      {course.introimg && (
        <Card
          style={{
            borderRadius: 12,
            overflow: "hidden",
            marginTop: height * 0.03,
            marginBottom: height * 0.05,
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
          }}
        >
          <Image
            source={{ uri: course.introimg }}
            style={{ width: "100%", height: height * 0.25 }}
            resizeMode="contain"
          />
        </Card>
      )}
    </ScrollView>
  );
}

export default OverviewScreen;
