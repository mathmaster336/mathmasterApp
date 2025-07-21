// src/utils/tokenStorage.js

import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'auth_token';

/**
 * Save auth token securely
 * @param {string} token - The auth token to store
 */
export const storeToken = async (token) => {
    try {
        await EncryptedStorage.setItem(
            TOKEN_KEY,
            JSON.stringify({ token })
        );
        console.log('Token stored securely');
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

/**
 * Retrieve auth token securely
 * @returns {Promise<string|null>} - Returns the token or null
 */
export const getToken = async () => {
    try {
        const data = await EncryptedStorage.getItem(TOKEN_KEY);
        if (data) {
            const { token } = JSON.parse(data);
            return token;
        }
        return null;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

/**
 * Remove auth token
 */
export const removeToken = async () => {
    try {
        await EncryptedStorage.removeItem(TOKEN_KEY);
        console.log('Token removed');
    } catch (error) {
        console.error('Error removing token:', error);
    }
};
