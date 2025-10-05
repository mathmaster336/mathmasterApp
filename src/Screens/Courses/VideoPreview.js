import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const { width } = Dimensions.get("window");

function VideoPreview({ preview, onBack }) {

    useEffect(() => {
        // Add back button listener
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (onBack) {
                onBack(); // trigger your callback
                return true; // prevent default navigation
            }
            return false; // let system handle it
        });

        // Cleanup on unmount
        return () => backHandler.remove();
    }, [onBack]);

    return (
        <View style={{ flex: 1 }}>
            {/* Back Button */}
            <TouchableOpacity
                onPress={onBack}
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 10,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: 20,
                    padding: 8,
                }}
            >
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Video Player */}
            <Video
                source={{ uri: preview.url }}
                style={{ width: "100%", height: 250, backgroundColor: "black" }}
                controls
                resizeMode="contain"
            />

            {/* Subtitle / Title */}
            <View style={{ width: "100%", justifyContent: "center", padding: 16 }}>
                <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
                    {preview.title || "Untitled Video"}
                </Text>
            </View>
        </View>
    );
}

export default VideoPreview;
