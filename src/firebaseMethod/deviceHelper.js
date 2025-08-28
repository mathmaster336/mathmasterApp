import DeviceInfo from 'react-native-device-info';

export async function getDeviceUniqueId() {
  try {
    const uniqueId = await DeviceInfo.getUniqueId(); // Waits for the promise
    // console.log("Device Unique ID:", uniqueId);      // ✅ Prints actual ID like "df09b2d2774d450e"
    return uniqueId;
  } catch (error) {
    console.error("Error getting device unique ID:", error);
    return null;
  }
}
