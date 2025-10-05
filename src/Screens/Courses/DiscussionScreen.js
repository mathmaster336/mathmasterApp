import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { db, auth } from "../../../firebase"; // Adjust the path
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";

function DiscussionScreen() {
  const [courseId, setCourseId] = useState("default"); // default fallback
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const route = useRoute();
  const { course } = route.params;

  useEffect(() => {
    if (course) {
      setCourseId(course.id);
    }
  }, [course]);

  // Load messages in real-time
  useEffect(() => {
    if (!courseId) return;

    const q = query(
      collection(db, "courses", courseId, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setMessages(allMessages);
    });

    return () => unsubscribe();
  }, [courseId]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "courses", courseId, "messages"), {
      text: input,
      senderId: auth.currentUser?.uid || "guest",
      senderName: auth.currentUser?.email || "Guest",
      createdAt: serverTimestamp(),
    });

    setInput("");
  };

  // Render a single message
  const renderItem = ({ item }) => {
    const isMe = item.senderId === auth.currentUser?.uid;

    return (
      <View
        className={`max-w-[75%] p-3 rounded-xl my-1 ${isMe ? "bg-blue-100 self-end" : "bg-white self-start border border-gray-300"}`}
      >
        {!isMe && (
          <Text className="text-xs font-bold text-gray-600 mb-1">
            {item.senderName}
          </Text>
        )}
        <Text className="text-base text-black">{item.text}</Text>
        {item.createdAt && (
          <Text className="text-xs text-gray-400 mt-1 self-end">
            {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            {/* Chat Feed */}
            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              inverted
              contentContainerStyle={{ padding: 10 }}
            />

            {/* Input Box */}
            <View className="flex-row items-center p-3 bg-white border-t border-gray-300">
              <TextInput
                className="flex-1 px-4 py-2 bg-gray-200 rounded-full text-black"
                placeholder="Type a message..."
                placeholderTextColor="#888"
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity
                className="ml-2 bg-blue-500 rounded-full px-4 py-2"
                onPress={sendMessage}
              >
                <Text className="text-white font-bold">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default DiscussionScreen;
