// storageHelper.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageHelper = {
  // Save data
  async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`✅ Data stored for key: ${key}`);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  },

  // Get data
  async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Error getting data:", error);
      return null;
    }
  },

  // Remove data
  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`🗑️ Data removed for key: ${key}`);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  },

  // Clear all storage
  async clearAll() {
    try {
      await AsyncStorage.clear();
      console.log("🔥 AsyncStorage cleared!");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};

export default StorageHelper;
