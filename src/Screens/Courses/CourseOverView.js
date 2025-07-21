import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

function CourseOverView() {
    const navigate = useNavigation();
    return (
        <View>
            <Text>CourseOverView</Text>
            <Button onPress={() => navigate.navigate("MainDrawer")}>Click </Button>
        </View>
    )
}

export default CourseOverView