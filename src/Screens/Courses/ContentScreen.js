import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, BackHandler, Dimensions, ActivityIndicator } from 'react-native';
import { ContentApi } from '../../Services/Axious/MMapi';
import Folders from './Folders';
import { commonContext } from '../../ContextApi/commonContext';
import VideoPreview from './VideoPreview';
import PDFpreview from './PDFpreview';
import ImagesPreview from './ImagesPreview';

const { width, height } = Dimensions.get("window");

function ContentScreen() {
    const [courseId, setCourseId] = useState('');
    const [folderId, setFolderId] = useState('');
    const [contentRes, setContentRes] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fl_name, setfl_name] = useState('');
    const { theme } = useContext(commonContext);
    const isDark = theme === 'dark';

    const [idStack, setidstack] = useState([]);
    const route = useRoute();
    const { course } = route.params;

    const [preview, setPreview] = useState({ type: "", url: "", title: "" });

    // Set courseId and courseData when the screen loads
    useEffect(() => {
        if (course) {
            setCourseId(course.id);
            setCourseData(course);
        }
    }, [course]);

    // Handle hardware back press
    useEffect(() => {
        const backAction = () => {
            if (idStack.length > 0) {
                handle_Back();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [idStack]);

    // Fetch content whenever courseId or folderId changes
    useEffect(() => {
        if (courseId) {
            getContentList();
        }
    }, [courseId, folderId]);

    // Fetch content from API
    const getContentList = async () => {
        try {
            setLoading(true);
            const req = {
                parentID: folderId || courseId,
                courseID: courseId,
            };

            const res = await ContentApi.post('/courses/courseContent', req);

            if (res) {
                setContentRes(res);
            } else {
                setContentRes(null);
            }
        } catch (error) {
            console.error('Error fetching content list:', error);
            setContentRes(null);
        } finally {
            setLoading(false);
        }
    };

    // Handle folder navigation
    const handleParentId = (id, name) => {
        setidstack(prevStack => [
            ...prevStack,
            folderId ? folderId : courseId
        ]);
        setFolderId(id);
        setfl_name(name);
    };

    // Handle going back
    const handle_Back = () => {
        setidstack(prevStack => {
            if (prevStack.length === 0) {
                setFolderId('');
                setfl_name(courseData?.courseName || '');
                return prevStack;
            }

            const newStack = [...prevStack];
            const lastId = newStack.pop();
            setFolderId(lastId);
            setfl_name('');
            return newStack;
        });
    };

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: width * 0.04,
                paddingTop: height * 0.02,
                backgroundColor: isDark ? "#121212" : "#f9f9f9",
            }}
        >
            {/* Course & Folder Info */}
            <View style={{ marginBottom: height * 0.01 }}>
                <Text
                    style={{
                        fontSize: width * 0.04,
                        fontWeight: "300",
                        color: isDark ? "#fff" : "#000",
                        marginBottom: 4,
                    }}
                >
                    Course: {courseData?.courseName || courseId}
                </Text>
                <Text style={{ fontSize: width * 0.03, color: isDark ? "#aaa" : "#555" }}>
                    Folder: {fl_name || courseData?.courseName}
                </Text>
            </View>

            {/* Loader */}
            {loading && (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
                </View>
            )}

            {/* Preview or Content */}
            {!loading && (
                preview.url ? (
                    preview.type === "video" ? (
                        <VideoPreview
                            preview={preview}
                            onBack={() => setPreview({ type: "", url: "", title: "" })}
                        />
                    ) : preview.type === "pdf" ? (
                        <PDFpreview
                            preview={preview}
                            onBack={() => setPreview({ type: "", url: "", title: "" })}
                        />
                    ) : preview.type === "image" ? (
                        <ImagesPreview
                            preview={preview}
                            onBack={() => setPreview({ type: "", url: "", title: "" })}
                        />
                    ) : null
                ) : contentRes && (
                    <Folders
                        folders={contentRes.folder}
                        videolist={contentRes.video}
                        pdflist={contentRes.pdf}
                        imagelist={contentRes.image}
                        handleParentId={handleParentId}
                        courseId={courseId}
                        setPreview={setPreview}
                        handle_Back={handle_Back}
                    />
                )
            )}
        </View>
    );
}

export default ContentScreen;
