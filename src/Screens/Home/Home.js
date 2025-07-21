import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';

function Home() {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Home</Text>
            <Button onPress={() => navigation.navigate("CourseOverview")}>Click </Button>

        </View>
    )
}

export default Home