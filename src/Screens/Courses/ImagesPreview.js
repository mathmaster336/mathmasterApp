import React, { useEffect } from 'react';
import { View, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';

const { width, height } = Dimensions.get("window");

function ImagesPreview({ preview, onBack }) {
  const images = [{ url: preview.url }]; // ImageViewer expects an array

  useEffect(() => {
    // Handle device back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onBack) {
          onBack();
          return true; // prevent default exit
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [onBack]);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 40,
          padding: 8,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Zoomable Image Viewer */}
      <ImageViewer
        imageUrls={images}
        enableSwipeDown
        onSwipeDown={onBack}
        backgroundColor="#000"
        saveToLocalByLongPress={false}
        enablePreload={true}
        renderIndicator={() => null} // hide pagination dots if only one image
      />
    </View>
  );
}

export default ImagesPreview;
