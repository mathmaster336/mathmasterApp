import React from 'react'
import { Text, View } from 'react-native'
import "./global.css"
import Navigator from './src/Navigator/Navigator'
import { CommonProvider } from './src/ContextApi/commonContext'



function App() {
  return (
    // <View className='bg-blue-200'>  
    //   <Text>This is Icon</Text>
    //   <Icon name="rocket" size={30} color="#900" />
 
    // </View>
    // <Navigator />
    <CommonProvider>
      <Navigator/>
    </CommonProvider>
  )
}

export default App