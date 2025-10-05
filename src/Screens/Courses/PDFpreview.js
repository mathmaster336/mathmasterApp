import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  Text,
} from "react-native";
import Pdf from "react-native-pdf";
import ReactNativeBlobUtil from "react-native-blob-util";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

const PDFpreview = ({ preview, onBack }) => {
  const [localFile, setLocalFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pdfRef = useRef(null);

  // 🔹 Download the PDF from Firebase URL and store locally
  useEffect(() => {
    const downloadPdf = async () => {
      try {
        setLoading(true);
        const res = await ReactNativeBlobUtil.config({
          fileCache: true,
        }).fetch("GET", preview.url);
        const filePath = res.path();
        setLocalFile(filePath);
      } catch (error) {
        console.log("❌ PDF download error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (preview?.url) downloadPdf();
  }, [preview?.url]);

  // 🔹 Handle Android hardware back press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onBack) {
          onBack();
          return true;
        }
        return false;
      }
    );
    return () => backHandler.remove();
  }, [onBack]);

  // 🔹 Loading screen
  if (loading || !localFile) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10, color: "#2563eb" }}>Loading PDF...</Text>
      </View>
    );
  }

  const source = { uri: `file://${localFile}` };

  // 🔹 Page change handler (from slider)
  const handlePageChange = (newPage) => {
    if (pdfRef.current && newPage !== page) {
      pdfRef.current.setPage(newPage);
      setPage(newPage);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Header */}
      <Text style={styles.pageInfo}>
        Page {page} 
      </Text>

      {/* 🔹 PDF Viewer + Vertical Slider */}
      <View style={styles.viewerContainer}>
        

        <Pdf
          ref={pdfRef}
          source={source}
          horizontal={false}
          enablePaging={false}
          fitPolicy={0}
          trustAllCerts={true}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log("✅ Total pages:", numberOfPages);
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(pageNum) => {
            setPage(pageNum);
          }}
          onError={(err) => console.log("❌ PDF load error:", err)}
          style={styles.pdf}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  viewerContainer: { flex: 1, flexDirection: "row", width: "100%" },
  pdf: {
    flex: 1,
    width: width , // space for slider
    height: height,
    margin:2
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pageInfo: {
    fontSize: 10,
    fontWeight: "600",
    color: "#1e3a8a",
    marginVertical: 5,
  },
  
});

export default PDFpreview;
