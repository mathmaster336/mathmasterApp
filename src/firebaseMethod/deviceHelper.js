import DeviceInfo from 'react-native-device-info';

export async function getDeviceUniqueId() {
  try {
    const uniqueId = await DeviceInfo.getUniqueId();
    return uniqueId;
  } catch (error) {
    console.error("Error getting device unique ID:", error);
    return null;
  }
}


