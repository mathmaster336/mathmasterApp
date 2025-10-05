import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-paper";
import Video from "react-native-video";
import WebView from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";
import { commonContext } from "../../ContextApi/commonContext";

const { width } = Dimensions.get("window");

function Folders({
  folders = [],
  videolist = [],
  pdflist = [],
  imagelist = [],
  handleParentId,
  setPreview,
  handle_Back,
}) {
  const { theme } = useContext(commonContext);
  const isDark = theme === "dark";

  const handlePreview = (type, url, title) => {
    setPreview({ type, url, title });
  };

  // Dynamic styles for dark / light
  const containerStyle = isDark ? "#121212" : "bg-white";
  const cardStyle = isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300";
  const textStyle = isDark ? "text-white" : "text-black";
  const subTextStyle = isDark ? "text-gray-300" : "text-gray-600";

  return (
    <ScrollView className={`flex-1 ${containerStyle}`}>
      <View className={`flex-1 p-2 relative ${containerStyle}`}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={handle_Back}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 20,
            padding: 6,
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-10"
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Folders */}
          {folders.map((folder) => (
            <TouchableOpacity
              key={folder.id}
              onPress={() => handleParentId(folder.id, folder.folderName)}
              className={`flex-row items-center my-1 py-2 px-3 rounded-lg border ${cardStyle}`}
            >
              <Icon source="folder" size={28} color="goldenrod" />
              <Text className={`ml-3 text-lg font-semibold ${textStyle}`}>
                {folder.folderName}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Videos */}
          {videolist.map((video) => (
            <TouchableOpacity
              key={video.id}
              onPress={() => handlePreview("video", video.url, video.title)}
              className={`flex-row items-center my-1 py-2 px-3 rounded-lg border ${cardStyle}`}
            >
              <Icon source="play-circle" size={28} color="#e8360e" />
              <Text className={`ml-3 text-lg font-semibold ${textStyle}`}>
                {video.title}
              </Text>
            </TouchableOpacity>
          ))}

          {/* PDFs */}
          {pdflist.map((pdf) => (
            <TouchableOpacity
              key={pdf.id}
              onPress={() => handlePreview("pdf", pdf.url, pdf.title)}
              className={`flex-row items-center my-1 py-2 px-3 rounded-lg border ${cardStyle}`}
            >
              <Icon source="file-pdf-box" size={28} color="red" />
              <Text className={`ml-3 text-lg font-semibold ${textStyle}`}>
                {pdf.title}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Images */}
          {imagelist.map((img) => (
            <TouchableOpacity
              key={img.id}
              onPress={() => handlePreview("image", img.url, img.title)}
              className={`flex-row items-center my-1 py-2 px-3 rounded-lg border ${cardStyle}`}
            >
              <Icon source="image" size={28} color="deepskyblue" />
              <Text className={`ml-3 text-lg font-semibold ${textStyle}`}>
                {img.title}
              </Text>
            </TouchableOpacity>
          ))}

          {folders.length === 0 &&
            videolist.length === 0 &&
            pdflist.length === 0 &&
            imagelist.length === 0 && (
              <Text className={`text-center mt-6 ${subTextStyle}`}>
                No content available
              </Text>
            )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

export default Folders;
