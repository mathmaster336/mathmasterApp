import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import { storeToken, getToken, removeToken } from '../../Services/encryptedStorage/tokenStorage';

const Home = () => {
    const navigation = useNavigation();
    const [token, storeToken] = useState('')








    return (
        <View>
            <Text>Home</Text>

            <Button onPress={() => navigation.navigate("CourseOverview")}>Click </Button>

        </View>
    )
}

export default Home